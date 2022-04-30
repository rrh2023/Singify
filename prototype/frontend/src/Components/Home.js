import React from 'react'
import SR from './SpeechRecognition'

const Homepage = ({auth}) => {
  return (
    <div className='header'>
        <h1 className='heading1'>Mu5ic&copy;</h1>
        <SR auth={auth}/> 
    </div>
  )
}

export default Homepage