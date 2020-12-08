import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'


const UserProfile = (props) => {
  console.log(props.match.params)
  const userId = props.match.params.userId
  const [user, updateUser] = useState({})

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(resp => {
        console.log(resp.data)
        updateUser(resp.data)
      })
  }, [])

  if (!user.genres) {
    return <div>
      <h2>Loading...</h2>
    </div>
  }

  return <main>
    <h1>{user.username}</h1>
    {console.log(user.genres)}
    <div className="interests">
      {user.genres.map((genre, index) => {
        return <div key={index}>
          <p>{genre.name}</p>
        </div>
      })}
    </div>
    <div className="userVideos">
      {user.videos.map((video, index) => {
        return <div className="videoCard" key={index}>
          <h3>{video.title}</h3>
          <ReactPlayer className="singleThumbnail"
            url={video.vid_url}
            width={600}
            height={400}
          />
          <p>{video.description}</p>
        </div>
      })}
    </div>
  </main>

}

export default UserProfile