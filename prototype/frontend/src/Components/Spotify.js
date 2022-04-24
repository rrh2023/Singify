import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Spotify = () => {

  const [auth, setAuth] = useState(false)
  const [searchKey, setSearchKey] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3001/checkAuth')
    .then(res => {
      setAuth(res.data.auth)
      console.log('User is logged in?:', res.data.auth)})

      console.log()
  }, [])


  const logout = () => { // get rid of tokens
    axios.get("http://localhost:3001/logout")
    .then(res => setAuth(res.data.auth))
  }

  return (

    <div>
      <h1>I'm the Spotify page!</h1>
     
        {
          !auth ?
          <a href={"http://localhost:3001/login"}>
          <button>Login</button>
         </a>
         :
         <button onClick={logout}>
           Logout
         </button>
        }

    </div>

    
  )
}

export default Spotify