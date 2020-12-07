import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/authentication'
import ReactPlayer from 'react-player'

const Video = (props) => {

  // Variables

  const token = localStorage.getItem('token')
  const videoId = props.match.params.videoId
  const [video, updateVideo] = useState([])
  const [replyBox, updateReplyBox] = useState({
    isReply: false,
    clickedComment: 0
  })

  const [formData, updateFormData] = useState({
    content: ''
  })

  const [errors, updateErrors] = useState({
    content: ''
  })

  const [newCommentData, updatenewCommentData] = useState({
    nested_content: ''
  })

  // Fetches from Backend

  useEffect(() => {
    axios.get(`/api/videos/${videoId}`)
      .then(resp => {
        updateVideo(resp.data)
      })
  }, [])

  // functions


  function handleDelete() {
    axios.delete(`/api/video/${videoId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        props.history.push('/')
      })
  }

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const data = {
      ...formData,
      [name]: value
    }
    const newErrors = {
      ...errors,
      [name]: ''
    }
    updateFormData(data)
    updateErrors(newErrors)
  }

  function handleComment(event) {
    event.preventDefault()

    axios.post(`/api/videos/${videoId}/comments`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
        } else {
          updateFormData({
            content: ''
          })
          updateVideo(resp.data)
        }
      })
  }

  function handleDeleteComment(commentId) {
    axios.delete(`/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateVideo(resp.data)
      })
  }


  function handleDeleteReply(nestedComment) {
    const commentId = 1
    const replyId = nestedComment.id
    axios.delete(`/comments/${commentId}/${replyId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateVideo(resp.data)
      })
  }


  function showReplyBox(clickedId) {
    const replyData = {
      isReply: true,
      clickedComment: clickedId
    }
    updateReplyBox(replyData)
    console.log(replyBox)
  }

  function handlesSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const replyData = {
      isReply: false,
      clickedComment: 0
    }
    updateReplyBox(replyData)
    axios.post(`/api/comments/${replyBox.clickedComment}/nested`, newCommentData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateVideo(resp.data)
      })

  }

  function handleReplyChange(event) {
    const data = {
      ...newCommentData,
      [event.target.name]: event.target.value
    }
    updatenewCommentData(data)
  }



  // Loading Screen

  if (!video.title) {
    return <div>
      <h2>Loading...</h2>
      <progress max='100'>60%</progress>
    </div>
  }

  // Content

  return <main className="singleVideoMain">
    <div>
      {/* Edit Video */}
      {isCreator(video.user.id) && <div>
        <Link to={`/videos/edit-video/${videoId}`}>Edit Video</Link>
        <button onClick={handleDelete}>Delete Video</button>
      </div>}
      {/* Video Content */}
      <h2 className="videoTitle">{video.title}</h2>
      <div className="thumbnailDescription">
        <ReactPlayer className="singleThumbnail"
          url="https://www.youtube.com/watch?v=ZzFYmz2lfT4"
          fluid={false}
          width={600}
          height={400}
        />
      </div>
      <p className="videoDescription">{video.description}</p>

      {/* New Comment */}

      <div className="commentSection">
        <h2 className="comments">Comments</h2>
        <form
          onSubmit={handleComment}
        >
          <textarea className="vidComment"
            value={formData.content}
            placeholder="Add a comment.."
            onChange={handleChange}
            name='content'
          >
          </textarea>
          <button>Submit</button>
        </form>

        {/* Existing Comments*/}

        <div className="existingComments">
          {video.comments && video.comments.map(comment => {
            return <div className="commentUser" key={comment.id}>
              <Link className="userLink" to={`/users/${comment.user.id}`}>
                {comment.user.username}
              </Link>
              <p className="commentContent">{comment.content}</p>
              {isCreator(comment.user.id) && <div>
                <Link to={`/edit-comment/${videoId}/${comment.id}`}>
                  Edit Comment
                </Link>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
              </div>}


              {/* Nested Comments */}

              {comment.nested_comments && comment.nested_comments.map(nested_comment => {
                return <div className="commentUser" key={nested_comment.id}>
                  <Link className="userLink" to={`/users/${nested_comment.user.id}`}>
                    {nested_comment.user.username}
                  </Link>
                  <p className="commentContent">{nested_comment.nested_content}</p>
                  {isCreator(nested_comment.user.id) && <div>
                    <button onClick={() => handleDeleteReply(nested_comment)}>Delete Comment</button>
                  </div>}
                </div>
              })
              }

              {/* Post a reply */}
              <p onClick={() => showReplyBox(comment.id)}>Reply</p>
              {replyBox.isReply && replyBox.clickedComment === comment.id ? <form
                onSubmit={handlesSubmit}
              >
                <textarea className="vidComment"
                  value={newCommentData.nested_content}
                  placeholder="Add a comment.."
                  onChange={handleReplyChange}
                  name='nested_content'
                >
                </textarea>
                <button>Reply</button>
              </form> : null}


            </div>
          })}
        </div>
      </div>
      <div>
      </div>
    </div>
  </main>
}

export default Video