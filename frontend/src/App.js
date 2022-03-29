import './App.css';
import {Routes, Route} from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Spotify from './Components/Spotify'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/spotify" element={<Spotify/>}/>
      </Routes>
    </div>
  );
}

export default App;
