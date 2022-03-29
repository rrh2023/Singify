import './App.css';
import {Routes, Route} from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Testing from './Components/Testing'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/testing" element={<Testing/>}/>
      </Routes>
    </div>
  );
}

export default App;
