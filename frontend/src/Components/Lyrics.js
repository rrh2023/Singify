import React, {useState} from 'react'

const Lyrics = () => {
  
  const [term, setTerm] = useState({
    term: ''
  })

  const [songs, setSongs] = useState([])

  const handleChange = (e) => {

    const value = e.target.value
    setTerm(()=> {
      return (
        {
          term: value
        }
      )
    })
    console.log(term.term)
  } 

  async function search(e){
    e.preventDefault() // do not refresh page
    let searchTerm = term.term
    console.log('our term', searchTerm)

    let res = await fetch(`https://api.lyrics.ovh/suggest/${searchTerm}`)
    let data = await res.json()
    setSongs(data.data)
    console.log(songs)
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
      {
        songs.length === 0 ? 
        <p style={{color: 'red'}}>No results...</p> 
        :
        songs.map(
          song => {
            return (
              <li key={song.id}>
                <span><strong>{song.artist.name}</strong> - {song.title} </span>
                <button>Get Lyrics</button>
              </li>
            )
          } 

        )
      }
    
      
    </div>
  )
}

export default Lyrics