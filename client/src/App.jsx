import React, { Component } from "react";
import MapContainer from "./containers/MapContainer";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Home from "./pages/Home/index";
import Maps from "./pages/Maps/index";
import Map from "./components/GoogleMap";
import NavBar from "./components/NavBar";
import Callback from "./Callback";
import SecuredRoute from "./components/SecuredRoute/SecuredRoute";
import NewQuestion from "./components/NewQuestion/NewQuestion";
import auth0Client from "./Auth";
import Pusher from "pusher-js";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import axios from "axios";
// CSS
// import "./App.css";
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
      text: "",
      username: "",
      chats: [],
      locationA: null,
      locationB: null
    };
  }

  async componentDidMount() {
    if (this.props.location.pathname === "/message") {
      this.setState({ checkingSession: false });
      const username = window.prompt("Username: ", "Anonymous");
      this.setState({ username, checkingSession: false });
      const pusher = new Pusher("be45f6d9f5b297267413", {
        cluster: "us2",
        encrypted: true
      });
      const channel = pusher.subscribe("chat");
      channel.bind("message", data => {
        this.setState({ chats: [...this.state.chats, data], test: "" });
      });
      return;
    }
    try {
      auth0Client.silentAuth()
      this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }
  }

  handleTextChange = (e) => {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text
      };
      axios.post("/message", payload);
    } else {
      this.setState({ text: e.target.value });
    }
    const styles = {
      marginBottom: 400
    };
  }

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
            <Route exact path="/message" component={ChatBox} />
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
  }
}

export default withRouter(App);
