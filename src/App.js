import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Imageupload from "./components/Imageupload";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Owndata from "./components/Owndata"
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={Imageupload} exact/>
          <Route path="/train" component={Owndata}/>
         
        </Switch>
      </div>
    </Router>
  );
}

export default App;
