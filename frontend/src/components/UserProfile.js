import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'react-router-dom'

const UserProfile = (props) =>{
  const userId = props.match.params.userId
  const [user, updateUser] = useState({})
  
  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(resp => {
        updateUser(resp.data)
      })
  }, [])

  if (!user.Id) {
    return <div>
      <h2>Loading...</h2>
    </div>
  }

  return <section className="userData">
  <h1>{user.username}</h1>
  <div className="userImageContainer">
    <img src={user.} />
  </div>
  </section>
}

export default UserProfile