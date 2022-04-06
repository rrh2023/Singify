import './App.css';
import {Routes, Route} from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Spotify from './Components/Spotify'
import SongKick from './Components/SongKick'
import Lyrics from './Components/Lyrics'
import SpeechRecognition from './Components/SpeechRecognition'



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/spotify" element={<Spotify/>}/>
        <Route exact path="/speechrecognition" element={<SpeechRecognition/>}/>
        <Route exact path="/songkick" element={<SongKick/>}/>
        <Route exact path="/lyrics" element={<Lyrics/>}/>
      </Routes>
    </div>
  );
}

export default App;
