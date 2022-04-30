import React, { useState, useEffect } from 'react'
import Songs from './Songs'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'



const Events = ({auth}) => {
  const [isListening, setIsListening] = useState(false)
  const [speech, setSpeech] = useState({
    text: ''
  })
  const [start, setStart] = useState(false);
  const [songs, setSongs] = useState([])


  useEffect(() => {
    handleListen() // listen function runs when isListening state alters
  }, [isListening])

  const handleListen = () => { // runs everytime isListening alters
    if (isListening) {
      mic.start()
      mic.onstart = () => {
        console.log('Mic is on')
      }
     
      mic.onend = () => {
        console.log('continuing..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Mic is off')
      }
    }
  

    mic.onresult = event => {
      event.preventDefault() // do not refresh page

      let transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      
      setSpeech(()=> { 
        return (
          {
            text: transcript
          }
        )
      })    

      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleType = (e) => {
    const {name, value} = e.target;

    setSpeech((prevInput) => {
      return {
        ...prevInput,
        [name]: value
      }
    })

  }

  const search = () => {
    fetch(`http://localhost:3001/lyricssearch/${speech.text}`).then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(data => {
        setStart(true)
        setSongs(data.data)   
      })
      .catch(err => console.log(err))

      setSpeech(() => {
        return (
          {
            text: ''
          }
        )
      })
  }

 
  return (
    <div className='search_bar'>
          {
          isListening ? 
          <>
           <span>🛑</span>
           <button onClick={() => setIsListening(prevState => !prevState)}>
           Stop
           </button>
          </>
          : 
          <>
          <span>🎙️</span> 
          <button onClick={() => setIsListening(prevState => !prevState)}>
           {/*  
           - this button calls the function that 
           changes the state of isListening 
           - */}
           Start
          </button>
          </>
          }

        {
          isListening
          ?
            <input className='input1' type="text" name="" id="" value={speech.text}/>
        :
          <input className='input1' type="text" name="text" id="" value={speech.text} onChange={handleType}/>
        }
        <button onClick={search}>Search</button>
          <button onClick={() => {
              setSpeech(()=> { 
                return (
                  {
                    text: ""
                  }
                )
              })
            }}>Clear Search</button>

        <Songs songs={songs} start={start} auth={auth}/>
      </div>
  )
}

export default Events