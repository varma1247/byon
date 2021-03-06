import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Imageupload from "./components/Imageupload";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Owndata from "./components/Owndata";
import Buildmodel from "./components/Buildmodel";
function App() {
  const [ownmodel, setOwnmodel] = useState([]);
  const setomodel = m => {
    setOwnmodel(m);
  };
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Owndata {...props} ownmodel={ownmodel} />}
          />
          <Route
            path="/build"
            render={props => (
              <Buildmodel
                {...props}
                ownmodel={ownmodel}
                setomodel={setomodel}
              />
            )}
          />
          <Route path="/imagenet" component={Imageupload} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
