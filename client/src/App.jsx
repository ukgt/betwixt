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

// CSS
// import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
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

  render() {
    return (
      <Router>
        <div className="root">
          <NavBar />
          <div className="main">
            <Route path="/" exact component={Home} />
            <Route path="/map" component={Maps} />
            <Route exact path="/callback" component={Callback} />
            <SecuredRoute
              path="/new-question"
              component={NewQuestion}
              checkingSession={this.state.checkingSession}
            />
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
