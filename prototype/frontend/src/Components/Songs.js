import React, {useState, useEffect} from 'react'
import Song from './fragments/Song'
import axios from 'axios'

const Songs = ({start, songs, auth}) => {
  


  return (
    <div className='search_result'>
      
      <h3 className='results'>API Results</h3>
      {!start && <p className='lyrics' style={{color: 'black'}}>Search for lyrics...</p> }
      {
        songs.length === 0 && start === true? 
        <p style={{color: 'red'}}>No results...</p> 
        :
        songs.map(
          song => {
            return (
              <Song key={song.id} artist={song.artist.name} songTitle={song.title} auth={auth}/>
            )
          } 
        )
      }
      
    </div>
  )
}

export default Songs