import React, { useState } from 'react'
import axios from 'axios'

const Login = (props) => {
  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/login', formData)
    .then(resp => {
      localStorage.setItem('token', resp.data.token)
      //! what are we sending this to? 
      props.history.push('/api/videos')
    })
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label>Email</label>
      <input 
      type="text"
      onChange={handleChange}
      value={formData.email}
      name="email"
      />
    </div>
    <div>
      <label>password</label>
      <input
      type="password"
      onChange={handleChange}
      value={formData.password}
      name="password"
      />
    </div>
    <button> Login </button>
  </form>

}

export default Login