import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


const styles = {
  container: {
    backgroundColor: "grey",
    height: "auto",
    width: "auto"
  },
  list: {
    width: "auto",
    //backgroundColor: "grey"
  },
  fullList: {
    width: "auto"
  },
  header: {
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    color: "white",
  }
};

function TemporaryDrawer(props) {
  const { classes, opened, handleDrawer } = props;


  const chatArea = (
    <div className={classes.container}>
      <Typography variant="h3" align="center" className={classes.header}>
        Hello to the chat!
      </Typography>
      <Divider variant="middle" />

    </div>
  )
  const sideList = (
    <div className={classes.list}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={opened}
        onClose={handleDrawer}
        className={classes.list}
      >
        {/* <div
          tabIndex={0}
          role="button"
        //   onClick={handleDrawer}
        //   onKeyDown={handleDrawer}
        >
          {sideList}
        </div> */}
        {/* <Paper elevation={5} className={classes.list}>
        Hello World
        </Paper> */}
        {chatArea}
      </Drawer>
    </div>
  );
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
