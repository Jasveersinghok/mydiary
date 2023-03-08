import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import NoteState from "./context/NoteState";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Singup from "./components/Singup";

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
  setInterval(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
        <Navbar/>
     <div style={{height:"60px"}}>   <Alert alert={alert} /></div>
          <Routes>
            <Route exact path="/" element={<Home showAlert = {showAlert}/>}/>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert = {showAlert}/>} />
            <Route exact path="/Singup" element={<Singup showAlert = {showAlert}/>} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
