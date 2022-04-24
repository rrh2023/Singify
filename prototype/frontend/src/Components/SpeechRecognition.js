import React, { useState, useEffect } from 'react'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

const Events = () => {
  const [isListening, setIsListening] = useState(false)
  const [speech, setSpeech] = useState({
    text: ''
  })


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
      // var res = event.results[0][0].transcript;
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      
      console.log(transcript)
      setSpeech(()=> { 
        return (
          {
            text: transcript
          }
        )
      })
      // console.log('WHAT YOU SAID:',res)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  return (
    <div>
      <h1>SpeechRecognition Page</h1>
      <div className="container">
        <div className="box">
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
        </div>
        <input type="text" name="" id="" value={speech.text}/>
        <button onClick={() => {
          setSpeech(()=> { 
            return (
              {
                text: ""
              }
            )
          })
        }}>Clear Search</button>
      </div>
    </div>
  )
}

export default Events