import React, { useState } from 'react'
import axios from 'axios'

const AddVideo = (props) => {

  const [formData, updateFormData] = useState({
    title: '',
    description: '',
    vid_url: ''
  })
  const inputFields = ['title', 'description', 'vid_url']

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    console.log(data)
    updateFormData(data)
  }
  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    axios.post('/api/videos', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        props.history.push('/')
      })
  }

  return <main className="mainEditVideo">
    <form onSubmit={handleSubmit}>
      {inputFields.map(field => {
        return <div key={field}>
          <label>{field}</label>
          <input
            type={field}
            onChange={handleChange}
            value={formData.field}
            name={field}
          />
        </div>
      })}
      <button>Save</button>
    </form>
  </main>
}

export default AddVideo