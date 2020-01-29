import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Imageupload from "./components/Imageupload";
import Navbar from "./components/Navbar"
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Imageupload />
      
    </div>
  );
}

export default App;
