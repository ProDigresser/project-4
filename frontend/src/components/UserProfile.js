import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { isCreator } from '../lib/authentication'
import { Link } from 'react-router-dom'


const UserProfile = (props) => {
  const userId = props.match.params.userId
  const [user, updateUser] = useState({})
  const [videos, updateVideos] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(resp => {
        updateUser(resp.data)
      })
    axios.get('/api/videos')
      .then(resp => {
        updateVideos(resp.data)
      })

  }, [props.match])


  function filterVideos() {

    // const filteredVideos = videos.filter(video => {

    //   return video.genres.find(o => o.name === user.genres[0].name)
    //    || video.genres.find(o => o.name === user.genres[1].name)
    //    || video.genres.find(o => o.name === user.genres[2].name)
    // })

    // console.log
    // return filteredVideos

    const userGenres = user.genres.map(({ name }) => name)

    return videos.filter(video => (
      video.genres.some(({ name }) => userGenres.includes(name))
    ))

  }



  if (!user.genres) {
    return  <div className="loaderWrapper">
      <h2>Loading...</h2>
      <div className="loader">
      </div>
    </div>
  }

  if (!videos[1]) {
    return <div className="loaderWrapper">
      <h2>Loading...</h2>
      <div className="loader">
      </div>
    </div>
  }

  return <main className="profileMain">

    <h1>{user.username}</h1>
    <div className="bio">
      <div className="bioContainer">
        <h4>Interests:</h4>
        <div className="interests">
          {user.genres.map((genre, index) => {
            return <div key={index}>
              <p>{genre.name}</p>
            </div>
          })}
        </div>
      </div>
    </div>
    {isCreator(user.id) && <div className="editContainer">
      <Link className="editProfile" to={`/edit-user/${userId}`}>Edit Profile</Link>
    </div>}

    <div className="headerVids">
      <h2>{user.username}'s videos</h2>
      <div className="userVideos">
        {user.videos.map((video, index) => {
          return <div className="videoCard" key={index}>
            <Link className="navLink" to={`/videos/${video.id}`}>{video.title}</Link>
            <ReactPlayer className="singleThumbnail"
              url={video.vid_url}
              width={250}
              height={150}
            />
            <p>{video.description}</p>

          </div>
        })}
      </div>
    </div>
    {/* Suggested Videos */}
    <div className="homeMain">
      <h2>Suggested for {user.username} based on Interests</h2>
      <div className="userVideos">
        {filterVideos().map((video, index) => {
          // console.log(video.vid_url.slice(17))
          return <div key={index}>
            <div className="cardOuter">
              <Link className="thumbnail"
                to={`/videos/${video.id}`}
                style={{ backgroundImage: `url(http://i3.ytimg.com/vi/${video.vid_url.slice(17)}/hqdefault.jpg)` }}
              ></Link>
              <div className="suggestedDescription">
                <Link className="navLink" to={`/videos/${video.id}`}>
                  <h2>{video.title}</h2>
                  <p>{video.description}</p>
                </Link>
              </div>
            </div>
          </div>
        })}
      </div>
      <div>

      </div>
    </div>
  </main>

}

export default UserProfile