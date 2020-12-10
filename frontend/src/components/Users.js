import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import logo from '../styles/howtologo.jpg'

const Users = (props) => {
  const [userData, updateUserData] = useState([])
  const [currentUser, updateUser] = useState()

  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('/api/users')
      .then(resp => {

        const userData = resp.data.map(user => {
          const setArr = {
            id: user.id,
            username: user.username,
            genres: user.videos.map(video => {
              const genreArr = []
              video.genres.map(genre => {

                genreArr.push(genre.name)
              })
              return genreArr
            }).flat(1),
            isActive: ''
          }
          setArr.genres = setArr.genres.filter((x, i) => setArr.genres.indexOf(x) === i)
          return setArr
        })

        updateUserData(userData)
      })

    axios.get(`/api/users/${userId}`)
      .then(resp => {
        updateUser(resp.data.following)
      })
  }, [])

  function handleFollow(e) {
    const user = userData.find(user => user.id === Number(e.target.value))
    const index = userData.indexOf(user)

    if (user.isActive === '') {
      const newUser = {
        id: user.id,
        username: user.username,
        genres: user.genres,
        isActive: 'button-is-active'
      }
      const newData = [...userData]
      newData.splice(index, 1, newUser)

      const update = () => updateUserData(newData)
      update()

      const newFollow = { following: [{ id: user.id }, ...currentUser] }

      axios.put('/api/follow', newFollow, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          updateUser(resp.data.following)
        })

    } 
    if (user.isActive !== '') {
      const newUser = {
        id: user.id,
        username: user.username,
        genres: user.genres,
        isActive: ''
      }
      const newData = [...userData]
      newData.splice(index, 1, newUser)
      const update = () => updateUserData(newData)
      update()

      const removeFollow = currentUser.find(user => user.id === Number(e.target.value))
      const i = currentUser.indexOf(removeFollow)


      
      currentUser.splice(i, 1)

      const putObj = { following: currentUser }

      axios.put('/api/follow', putObj, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          updateUser(resp.data.following)
        })
    }
  }

  return <main className="usersMain">
    <div className="userCard">
      {userData && userData.map(user => {
        
        if (currentUser !== undefined) {
          const findFollow = currentUser.find(follower => follower.id === user.id)
          if (findFollow !== undefined) {
            user.isActive = 'button-is-active'
          } else {
            user.isActive = ''
          }
        }

        return <div className="userName" key={user.username}>
          <img src={logo} height={50} />
          <Link className="userLink" to={`/users/${user.id}`} >
            <h2>{user.username}</h2>
          </Link>
          <h3>
            {user.genres.map((genre, i) => {
              if (i === 0) {
                return <span key={i}>Known for: {genre}</span>
              } else if (i < user.genres.length - 1) {
                return <span key={i}> {genre}</span>
              } else {
                return <span key={i}> and {genre} </span>
              }
            })}
          </h3>
          <button className={`follow-button ${user.isActive}`} value={user.id} onClick={handleFollow}>
            <span>{user.isActive === '' ? 'Follow' : 'Following'}</span>
            
            
          </button>
        </div>
      })}
    </div>
  </main>



}

export default Users