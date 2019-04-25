import React, { Component } from "react";
import MapContainer from "./containers/MapContainer";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from "./pages/Home/index";
import Maps from "./pages/Maps";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

// CSS
// import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="root">
        <NavBar />
        <div className="main">
          <Route path="/" exact component={Home} />
          <Route path="/map" component={Maps} />
          <Footer />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
