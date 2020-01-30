import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Imageupload from "./components/Imageupload";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const Train=()=>{
  return (
    <div>
      <h1>Train</h1>
    </div>
  )
}
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={Imageupload} exact/>
          <Route path="/train" component={CircularProgress}/>
         
        </Switch>
      </div>
    </Router>
  );
}

export default App;
