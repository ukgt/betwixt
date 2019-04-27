import React, { Component } from "react";
import MapContainer from "./containers/MapContainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home/index";
import Maps from "./pages/Maps/index";
import Map from "./components/GoogleMap";
import NavBar from "./components/NavBar";
import MediaCard from "./components/MediaCard";
import Stepper from "./components/Stepper";
import Paper from "@material-ui/core/Paper";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationA: null,
      locationB: null
    };
  }

  styles = {
    marginBottom: 400
  };

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className="root">
            <NavBar />
            <div className="main">
              <Route
                path="/"
                exact
                render={props => <Home {...props} handleInput={true} />}
              />
              <Route path="/map" render={props => <Maps {...props} />} />
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
