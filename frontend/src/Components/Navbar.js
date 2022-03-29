import React from 'react'
import {Link} from "react-router-dom";

const Navbar = () => {
  return (      
      <nav>

        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/spotify">Spotify</Link>
        </li>
        <li>
          <Link to="/lyrics">Lyrics</Link>
        </li>
        <li>
          <Link to="/speechrecognition">Speech Recognition</Link>
        </li>
        <li>
          <Link to="/songkick">Song Kick</Link>
        </li>

      </nav>
  )
}

export default Navbar