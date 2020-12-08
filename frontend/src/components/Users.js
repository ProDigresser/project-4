import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Users = (props) => {
  const [userData, updateUserData] = useState([])

  useEffect(() => {
    axios.get('/api/users')
      .then(resp => {
        updateUserData(resp.data)
      })
  }, [])

  return <main className="usersMain">
    <div className="userCard">
      {userData.map((user, index) => {
        return <div key={index}>
          <Link to={`/users/${user.id}`} >
            <h2>{user.username}</h2>
          </Link>
        </div>
      })}
    </div>
  </main>



}

export default Users