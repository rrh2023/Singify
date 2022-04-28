import React from 'react'
import SR from './SpeechRecognition'

const Homepage = ({auth}) => {
  return (
    <div>
        <h1>I'm the homepage!</h1>
        <SR auth={auth}/> 
    </div>
  )
}

export default Homepage