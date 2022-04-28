import './App.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Routes, Route} from "react-router-dom";
import Home from './Components/Home'
import Favs from './Components/Favs'
import SpotifyArtists from './Components/SpotifyArtists'
import Unauthorized from './Components/Unauthorized';
import NotFound from './Components/NotFound';
import {Link} from "react-router-dom";





function App() {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/checkAuth')
    .then(res => {
      setAuth(res.data.auth)
      console.log('User is logged in?:', res.data.auth)})
  }, [])

  const logout = () => { // get rid of tokens
    axios.get("http://localhost:3001/logout")
    .then(res => setAuth(false))
    window.location='/'
  }




  return (
    <div className="App">
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        {
          !auth ?
          <li>
              <a href="http://localhost:3001/login">Login</a>
          </li>
      :
      <>
          <li>
            <Link to="/favs">Favorite Songs</Link>
          </li>
          <li>
            <Link to="/spotifyartists">Followed Spotify Artists</Link>
          </li>
          <li>
            <a href="" onClick={logout}>Logout</a>
          </li>
        </>
          }
       
      </nav>

      <Routes>
        <Route exact path="/" element={<Home auth={auth}/>}/>
        <Route exact path="/favs" element={<Favs auth={auth}/>}/>
        <Route exact path="/spotifyartists" element={<SpotifyArtists auth={auth}/>}/>
        <Route exact path="/unauthorized" element={<Unauthorized auth={auth}/>}/>
        <Route exact path="/*" element={<NotFound auth={auth}/>}/>
      </Routes>
    </div>
  );
}

export default App;
