import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditComment = (props) => {

  const [formData, updateFormData] = useState({
    content: ''
  })
  console.log(props)
  useEffect(() => {
    axios.get(`/api/comments/${props.match.params.commentId}`)
      .then(resp => {
        console.log(resp.data.content)
        updateFormData({ content: resp.data.content })
      })
  }, [])

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    updateFormData(data)
  }

  function handlesSubmit(event) {
    console.log(formData)
    event.preventDefault()
    const token = localStorage.getItem('token')
    axios.put(`/api/comments/${props.match.params.commentId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push(`/videos/${props.match.params.videoId}`)
      })
  }

  return <main className="singleVideoMain">
    <div className="commentSection">
      <h2 className="comments">Edit your comment</h2>
      <form onSubmit={handlesSubmit}>
        <textarea className="vidComment"
          value={formData.content}
          placeholder="Add a comment.."
          onChange={handleChange}
          name='content'>
        </textarea>
        <button>Submit</button>
      </form>
    </div>
  </main>

}

export default EditComment