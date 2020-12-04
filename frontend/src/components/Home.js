import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const [videos, updateVideos] = useState([])
  const [videoFilter, updateVideoFilter] = useState('Select your Genre')
  const [searchText, updateSearchText] = useState('')

  useEffect(() => {
    axios.get('/api/videos')
      .then(resp => {
        updateVideos(resp.data)
      })
  }, [])

  if (!videos[1]) {
    return <div>
      <h2>Loading...</h2>
      <progress max='100'>60%</progress>
    </div>
  }

  console.log(videos)

  function filterVideos() {
    const filteredVideos = videos.filter(video => {
      const title = video.title.toLowerCase()
      const filterText = searchText.toLocaleLowerCase()
      return title.includes(filterText)
        && (videoFilter === 'Select your Genre' || video.genre === videoFilter)
    })
    return filteredVideos
  }

  function getGenres() {
    const mappedVideos = videos.map((video => video.genre))
    const genreList = new Set(mappedVideos)
    const arrayGenres = Array.from(genreList)
    return arrayGenres
  }

  return <div>
    <div>
      <input
        placeholder="Search for a video.."
        onChange={(event) => updateSearchText(event.target.value)}
        value={searchText}
      />
      <select
        value={videoFilter}
        onChange={(event) => updateVideoFilter(event.target.value)}>
        <option>Select your Genre</option>
        {getGenres().map((genre, index) => {
          return <option key={index}>{genre}</option>
        })}
      </select>
    </div>
    <div>
      {filterVideos().map((video, index) => {
        return <div key={index}>
          <Link to={`/videos/${video.id}`}>
            <div>
              <h2>{video.title}</h2>
              <p>{video.description}</p>
            </div>
          </Link>
        </div>
      })}
    </div>
  </div>
}

export default Home