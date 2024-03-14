import React,{useState} from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Board from './Components/Board';
import Myposts from './Components/Myposts';
import AppState from './context/AppState';
import Alert from './Components/Alert';
function App() {
  const [alert, setAlert] = useState({msg:"Hello",type:"primary"});

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
    <AppState>
    <Alert  alert={alert}/>
    <Router>
    <Navbar/>
    
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/myposts"  element={<Myposts/>}/>
          <Route exact path="/board" element={<Board/>}/>
    </Routes>
    </Router>
    </AppState>
    </>
  );
}

export default App;
