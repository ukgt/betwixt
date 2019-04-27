import React, { Component } from "react";
import MapContainer from "./containers/MapContainer";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Home from "./pages/Home/index";
import Maps from "./pages/Maps/index";
import Map from "./components/GoogleMap";
import NavBar from "./components/NavBar";
import Callback from "./Callback";
import SecuredRoute from "./components/SecuredRoute/SecuredRoute";
import NewQuestion from "./components/NewQuestion/NewQuestion";
import auth0Client from "./Auth";
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
      checkingSession: true,
      locationA: null,
      locationB: null
    };
  }

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }
    this.setState({ checkingSession: false });
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
              <Route exact path="/callback" component={Callback} />
              <SecuredRoute
                path="/new-question"
                component={NewQuestion}
                checkingSession={this.state.checkingSession}
              />
          </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  };
}

// <<<<<<< HEAD
// export default App
// =======
export default withRouter(App);
// >>>>>>> 8d3c9a1dc7b65b11ed5ecda6d382e939533fa09d
