import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, withRouter } from "react-router-dom";
import auth0Client from "../../Auth";

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function NavBar(props) {
  const { classes } = props;
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace("/");
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Betwixt
          </Typography>
          {/* <Typography variant="h6" color="inherit">Shaun</Typography> */}
          {/* <Button color="inherit">Sign Up/Login</Button>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"> */}
          {/* <AccountCircle /> */}
          {/* </IconButton> */}
          {!auth0Client.isAuthenticated() && (
            <button className="btn btn-dark" onClick={auth0Client.signIn}>
              Sign In
            </button>
          )}
          {auth0Client.isAuthenticated() && (
            <div>
              <label className="mr-2 text-white">
                {auth0Client.getProfile().name}
              </label>
              <button
                className="btn btn-dark"
                onClick={() => {
              
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(NavBar);
export default withRouter(withStyles(styles)(NavBar));
