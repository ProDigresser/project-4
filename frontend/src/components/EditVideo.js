import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditVideo = (props) => {

  const [formData, updateFormData] = useState({
    title: '',
    description: '',
    vid_url: ''
  })

  useEffect(() => {
    axios.get(`/api/videos/${props.match.params.videoId}`)
      .then(resp => {
        console.log(resp.data)
        updateFormData({
          title: resp.data.title,
          description: resp.data.description,
          vid_url: resp.data.vid_url
        })
      })
  }, [])

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    axios.put(`/api/videos/${props.match.params.videoId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push('/')
      })
  }

  return <main className="mainEditVideo">
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        onChange={handleChange}
        value={formData.title}
        name="title"
      />
      <label>Description</label>
      <input
        type="text"
        onChange={handleChange}
        value={formData.description}
        name="description"
      />
      <label>Video URL</label>
      <input
        type="text"
        onChange={handleChange}
        value={formData.vid_url}
        name="vid_url"
      />
      <button>Save</button>
    </form>
  </main>
}

export default EditVideo