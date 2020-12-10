import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ReplyComment = (props) => {

  const [formData, updateFormData] = useState({
    content: ''
  })

  const [newCommentData, updatenewCommentData] = useState({
    nested_content: ''
  })


  useEffect(() => {
    axios.get(`/api/comments/${props.match.params.commentId}`)
      .then(resp => {
        updateFormData(resp.data)
        console.log(resp.data)
      })
  }, [])

  function handleChange(event) {
    const data = {
      ...newCommentData,
      [event.target.name]: event.target.value
    }
    updatenewCommentData(data)
  }

  function handlesSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    axios.post(`/api/comments/${props.match.params.commentId}/nested`, newCommentData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push(`/videos/${resp.data.id}`)
      })
  }

  if (!formData.content) {
    return <div className="loaderWrapper">
      <h2>Loading...</h2>
      <div className="loader">
      </div>
    </div>
  }

  return <main className="singleVideoMain">
    <div className="commentSection">
      <div className="existingComments">
        <h2 className="comments">Reply to {formData.user.username}'s comment:</h2>
        <div className="commentUser">
          <Link className="userLink" to={`/users/${formData.user.id}`}>
            {formData.user.username}
          </Link>
          <p className="commentContent">
            {formData.content}
          </p>
        </div>
      </div>
      <form
        onSubmit={handlesSubmit}
      >
        <textarea className="vidComment"
          value={newCommentData.nested_content}
          placeholder="Add a comment.."
          onChange={handleChange}
          name='nested_content'
        >
        </textarea>
        <button>Submit</button>
      </form>
    </div>
  </main>
}

export default ReplyComment