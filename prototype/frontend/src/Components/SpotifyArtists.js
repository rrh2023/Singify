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
    <div className='followed_artist'>
      <div className='inner'>
      <h1>Artists You Follow</h1>
      <div style={{width: '100%'}}>
      <h4 style={{float:'left', width:'20%'}}>ARTISTS</h4>
      <h4 style={{float:'left', width:'60%'}}>EVENTS</h4>
      </div>
      <div style={{clear:'both'}}>
        <hr></hr>
      
        
        {
          artists.map(artist => {
            return <ArtistPage key={artist.id} artist={artist}/>
          })
        }
        
      </div>
      </div>
    </div>
    
  )
}

export default SpotifyFavs