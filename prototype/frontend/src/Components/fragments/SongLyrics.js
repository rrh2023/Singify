import React, {useState} from 'react'

const SongLyrics = (props) => {
    const [showLyrics, setShowLyrics]= useState(false)
    const [lyrics, setLyrics]  = useState({
        text: ''
    })

    async function getLyrics(artist, songTitle) {

        await fetch(`http://localhost:3001/getlyrics/${artist}/${songTitle}`).then(res => {
            if(res.ok){
              return res.json()
            }
          })
          .then(data => {
            setLyrics(() => {
                return ({
                    text: data.lyrics
                })
            })  
          })
          .catch(err => console.log(err))
            
    }

    

  return (
    <div>
        <h6>{props.artist}</h6>
        <h6>{props.songTitle}</h6>

        { showLyrics === false ?
            <button onClick={() => {
                setShowLyrics(!showLyrics)
                getLyrics(props.artist, props.songTitle)
                }}>
                Show Lyrics
            </button>
            :
            <div>
                <button onClick={() => {setShowLyrics(!showLyrics)}}>
                    Hide Lyrics
                </button>
                <span>{lyrics.text}</span>
            </div>
        }
    </div>
      
    )
}

export default SongLyrics