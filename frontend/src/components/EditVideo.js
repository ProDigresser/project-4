import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditVideo = (props) => {

  const [formData, updateFormData] = useState({
    title: '',
    description: '',
    vid_url: ''
  })
  const inputFields = ['Title', 'Description', 'Vid_url']

  useEffect(() => {
    axios.get(`/api/videos/${props.match.params.videoId}`)
      .then(resp => {
        updateFormData(resp.data)
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
        props.history.push('/videos')
      })
  }

  return <main className="mainEditVideo">
    <form onSubmit={handleSubmit}>
      {inputFields.map(field => {
        return <div key={field}>
          <label>{field}</label>
          <input
            type="text"
            onChange={handleChange}
            value={formData[field]}
            name={field}
          />
        </div>


      })}
      <button>Save</button>
    </form>
  </main>
}

export default EditVideo