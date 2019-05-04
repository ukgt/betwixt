import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "../../components/Drawer";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, withRouter } from "react-router-dom";
import auth0Client from "../../Auth";
import renderEmpty from "antd/lib/config-provider/renderEmpty";
import logo from "../../logo.png"

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 20
  },
  grow: {
    flexGrow: 1
  },
  mx: {
    marginLeft: 5,
    marginRight: 5
  },
  authPanel: {
    display: "flex"
  }, 
  logo: {
    height: 60
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };
  }

  render() {
    const { classes, history } = this.props;

    this.signOut = () => {
      auth0Client.signOut();
      history.replace("/");
    };

    this.handleDrawer = bool => () => {
      this.setState({ opened: bool });
    };

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.grow}>
            <Button component={Link} to="/">
            <img src={logo} alt="logo" className={classes.logo}/>
            </Button>
            </div>

            {/* <Typography variant="h6" color="inherit" className={classes.grow}>
              Between
            </Typography> */}
            {/* <Typography variant="h6" color="inherit">Shaun</Typography> */}
            {/* <Button color="inherit">Sign Up/Login</Button> */}

            {!auth0Client.isAuthenticated() && (
              <Button
                variant="outlined"
                color="inherit"
                onClick={auth0Client.signIn}
                className={classes.mx}
              >
                Sign In
              </Button>
            )}
            {auth0Client.isAuthenticated() && (
              <div className={classes.authPanel}>
                <Typography
                  variant="h6"
                  color="inherit"
                  //className={classes.grow}
                >
                  {auth0Client.getProfile().name}
                </Typography>

                <Button
                  variant="outlined"
                  color="inherit"
                  className={classes.mx}
                  onClick={() => {
                    this.signOut();
                  }}
                >
                  Sign Out
                </Button>
              </div>
            )}

            <IconButton
              //className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawer(true)}
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          opened={this.state.opened}
          handleDrawer={this.handleDrawer(false)}
        />
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(NavBar);
export default withRouter(withStyles(styles)(NavBar));