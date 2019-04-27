import React, { Component } from "react";
// import MapContainer from "./../containers/MapContainer";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from "./../pages/Home/index";
import Maps from "./../pages/Maps";
// import SignIn from "./../pages/SignIn";
import Footer from "./Footer";
// import NavBar from "./NavBar";
export default class Main extends Component {
render(){
    return(
        <div>
<Router>
      <div className="root">
      {/* {this.props.name} */}
        <div className="main">
          <Route path="/" exact component={Home} />
          <Route path="/map" component={Maps} />
          <Footer />
        </div>
      </div>
    </Router>
            </div>
    )
}

} 