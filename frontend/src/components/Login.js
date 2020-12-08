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
        console.log(resp.data)
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('userId', resp.data.user_id)
        localStorage.setItem('userName', resp.data.username)

        props.history.push('/')
        window.location.reload()
      })
  }

  return <main className="loginMain">
    <form onSubmit={handleSubmit}>
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
  </main>

}

export default Login