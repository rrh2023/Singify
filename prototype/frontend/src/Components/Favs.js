import axios from 'axios'
import React, {useState, useEffect} from 'react'
import  { Route, Navigate } from 'react-router-dom' 

const Favs = ({auth}) => {
  const [songs, setSongs] = useState([])
  useEffect(() => {
    console.log(
      'I AM AUTHORIZED'
    )
    if(auth){
      async function favSongData(){
        await fetch('http://localhost:3001/favsongs')
        .then(res => {
          if(res.status === 200){
            return res.json()
          }
        })
        .then(data => {
          setSongs(data.songs)
        })
    }
    favSongData();
    }else{
      window.location='/unauthorized'
    }
    
  }, [])

  const deleteSong = (id) => {
    axios.get(`http://localhost:3001/delete/${id}`)
    console.log(songs)
    setSongs(songs.filter(song => song._id !== id))
  }

  return (
    <div className='favorite_song'>
      <div className='inner'>
      <h1>Favorite Songs</h1>
      {
        songs.map(song => {
          return <div style={{marginTop:'3vw'}} className='each_artist' key={song._id}>
            <p className='artist_name'>{song.artist} - {song.songTitle}</p>
            <button className='event_button' onClick={() => deleteSong(song._id)}>Delete</button> 
          </div>
        })
      }
      </div>
    </div>
    
  )
}

export default Favs