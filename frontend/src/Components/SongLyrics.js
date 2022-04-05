import React, {useState} from 'react'
import LyricFragment from './html/LyricFragment'

const SongLyrics = (props) => {
    const [showLyrics, setShowLyrics]= useState(false)
    const [lyrics, setLyrics]  = useState({
        text: ''
    })

    async function getLyrics(artist, songTitle) {
        console.log("running")
        const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
        const data = await res.json();
        // const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        setLyrics(() => {
            return ({
                text: data.lyrics
            })
        })
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