import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/styles.scss'


const Home = () => {

  //  Variables


  const [videos, updateVideos] = useState([])
  const [videoFilter, updateVideoFilter] = useState('Select your Genre')
  const [searchText, updateSearchText] = useState('')


  // Fetches from our backend

  useEffect(() => {
    axios.get('/api/videos')
      .then(resp => {
        updateVideos(resp.data)
        console.log(resp.data)
      })

  }, [])

  // Loading screen

  if (!videos[1]) {
    return <div className="loaderWrapper">
      <h2>Loading...</h2>
    <div className="loader">
      </div>
    </div>
  }

  // Functions

  function filterVideos() {
    const filteredVideos = videos.filter(video => {
      const title = video.title.toLowerCase()
      const filterText = searchText.toLocaleLowerCase()
      return title.includes(filterText)
        && (videoFilter === 'Select your Genre' || video.genres.find(o => o.name === videoFilter))
    })
    return filteredVideos
  }

  // Content

  return <main className="homeMain">

    <div className="genre">
      <input
        placeholder="Search for a video.."
        onChange={(event) => updateSearchText(event.target.value)}
        value={searchText}
      />
      <select
        value={videoFilter}
        onChange={(event) => updateVideoFilter(event.target.value)}>
        <option>Select your Genre</option>
        <option>Animation</option>
        <option>Writing</option>
        <option>Film & Video</option>
        <option>Graphic Design</option>
        <option>Art & Illustration</option>
        <option>Music</option>
        <option>Photography</option>
        <option>UI/UX Design</option>
        <option>Web Development</option>
        <option>Cooking</option>
        <option>Lifestyle</option>
        <option>Productivity</option>
      </select>
    </div>

    <div className="videoCards">
      {filterVideos().map((video, index) => {
        // console.log(video.vid_url.slice(17))
        return <div key={index}>
          <div className="cardOuter">
            <Link className="thumbnail"
              to={`/videos/${video.id}`}
              style={{ backgroundImage: `url(http://i3.ytimg.com/vi/${video.vid_url.slice(17)}/hqdefault.jpg)` }}
            ></Link>
            <div className="descriptionContainer">
              <Link className="vidLink" to={`/videos/${video.id}`}>
                <h2>{video.title}</h2>
                <p>{video.description}</p>
              </Link>
            </div>
          </div>
        </div>
      })}
    </div>
  </main>
}

export default Home