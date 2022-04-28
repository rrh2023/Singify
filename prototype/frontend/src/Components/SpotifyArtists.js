import React, {useEffect, useState} from 'react'
import ArtistPage from './ArtistPage'

const SpotifyFavs = ({auth}) => {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    if (auth) {
      async function favFollowingData(){
        await fetch('http://localhost:3001/getUsersArtists')
        .then(res => {
          if(res.status === 200){
            return res.json()
          }
        })
        .then(data => {
          setArtists(data.artists.items)
        })
    }
    favFollowingData();
    } else {
      window.location='/unauthorized'
    }
    
  }, [])

  


  return (
    <>
      <h1>Artists You Follow</h1>
      <div>
        {
          artists.map(artist => {
            return <ArtistPage key={artist.id} artist={artist}/>
          })
        }
      </div>
    </>
    
  )
}

export default SpotifyFavs