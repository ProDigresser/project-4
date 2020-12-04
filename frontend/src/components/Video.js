import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/authentication'

const Video = (props) => {

  // Variables

  const token = localStorage.getItem('token')
  const videoId = props.match.params.videoId
  const [video, updateVideo] = useState([])

  const [formData, updateFormData] = useState({
    content: ''
  })

  const [errors, updateErrors] = useState({
    content: ''
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
    axios.delete(`/api/videos/${videoId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateVideo(resp.data)
      })
  }

  // Loading Screen

  if (!video.title) {
    return <div>
      <h2>Loading...</h2>
      <progress max='100'>60%</progress>
    </div>
  }

  // Content

  return <div>
    {isCreator(video.user.id) && <div>
      <Link to={`/videos/edit-video/${videoId}`}>Edit Video</Link>
      <button onClick={handleDelete}>Delete Video</button>
    </div>}
    <div>
      <h2>{video.title}</h2>
      <p>{video.description}</p>
    </div>
    <div>
      {/* comments go here */}
    </div>

  </div>
}

export default Video