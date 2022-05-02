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
      <nav className="navbar">
        
        <div>
          <Link to="/" style={{textDecoration:'none'}}>Home</Link>
        </div>
        {
          !auth ?
          <div>
              <a style={{textDecoration:'none'}} href="http://localhost:3001/login">Login</a>
          </div>
      :
        <>
        <div><Link to="/favs" style={{textDecoration:'none'}}>Favorite Songs</Link></div>
        <div><Link to="/spotifyartists" style={{textDecoration:'none'}}>Followed Spotify Artists</Link></div>
        <div>
          <a  style={{textDecoration:'none'}} href="#" onClick={logout}>Logout</a>
        </div>
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
