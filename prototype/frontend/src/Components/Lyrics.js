import React, {useState} from 'react'
import SongLyrics from './fragments/SongLyrics'

const Lyrics = () => {
  const [start, setStart] = useState(false);
  const [term, setTerm] = useState({
    term: ''
  })

  const [songs, setSongs] = useState([])

  const handleChange = (e) => {

    const value = e.target.value
    setTerm(()=> { // search term state updated
      return (
        {
          term: value
        }
      )
    })
  } 

  async function search(e){
    e.preventDefault() // do not refresh page
    let searchTerm = term.term
    
    fetch(`http://localhost:3001/lyricssearch/${searchTerm}`).then(res => {
      if(res.ok){
        return res.json()
      }
    })
    .then(data => {
      setStart(true)
      setSongs(data.data)   
    })
    .catch(err => console.log(err))

    setTerm(() => { // term is empty again
      return (
        {
          term: '',
        }
      )
    })

  }


  return (
    <div>
      <h1>I'm the Lyrics.vho page!</h1>

      <form>
        <input type="text" name="term" onChange={handleChange} value={term.term}/>
        <input type="submit" value="Search" onClick={search}/>
      </form>
      
      <h3>API Results</h3>
      {!start && <p style={{color: 'purple'}}>Search for lyrics...</p> }
      {
        songs.length === 0 && start === true? 
        <p style={{color: 'red'}}>No results...</p> 
        :
        songs.map(
          song => {
            return (
              <SongLyrics key={song.id} artist={song.artist.name} songTitle={song.title}/>
            )
          } 
        )
      }
    
      
    </div>
  )
}

export default Lyrics