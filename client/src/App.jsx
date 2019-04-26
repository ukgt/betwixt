import React, { Component } from "react";
import MapContainer from "./containers/MapContainer";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Home from "./pages/Home/index";
import Maps from "./pages/Maps";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
      text: "",
      username: "",
      chats: [],
    };
  }

  async componentDidMount() {
    if (this.props.location.pathname === "/message") {
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
     const username = window.prompt("Username: ", "Anonymous");
     this.setState({ username });
     const pusher = new Pusher("be45f6d9f5b297267413", {
       cluster: "us2",
       encrypted: true,
     });
     const channel = pusher.subscribe("chat");
     channel.bind("message", data => {
       this.setState({ chats: [...this.state.chats, data], test: "" });
     });
     this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange = (e) => {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text,
      };
      axios.post("http://localhost:3000/message", payload);
    } else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <Router>
        <div className="root">
          <NavBar />
         
          <div className="main">
            <Route path="/" exact component={Home} />
            <Route path="/map" component={Maps} />
            <Route exact path="/message" component={Callback} />
            <SecuredRoute
              path="/new-question"
              component={NewQuestion}
              checkingSession={this.state.checkingSession}
            />
             <section>
              <ChatList chats={this.state.chats} />
              <ChatBox
                text={this.state.text}
                username={this.state.username}
                handleTextChange={this.handleTextChange}
              />
            </section>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
