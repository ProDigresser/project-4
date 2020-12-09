import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditUser = (props) => {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    profession: '',
    password: '',
    password_confirmation: ''
  })


  useEffect(() => {
    axios.get(`/api/users/${props.match.params.userId}`)
      .then(resp => {
        console.log(resp.data)
        updateFormData({
          username: resp.data.username
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
    axios.put('/api/update_user', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push(`/users/${props.match.params.userId}`)
      })
    localStorage.setItem('userName', formData.username)
  }

  return <main className="mainEditVideo">
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        type="text"
        onChange={handleChange}
        value={formData.username}
        name="username"
      />
      <button>Save</button>
    </form>
  </main>
}

export default EditUser