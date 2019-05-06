import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
  },
  paper: {
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class SimpleModal extends React.Component {

  render() {
    const { classes, card  } = this.props;
    const { name, rating, address, distanceA, distanceB, durationA, durationB } = card

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
          className={classes.root}
        >
          <div className={classes.paper}>
            <Typography variant="h5" id="modal-title">
              {name || "N/A"}
            </Typography>
            <Typography variant="subtitle1" id="modal-title">
              {"Address: " + address || "N/A"}
            </Typography>
            <Typography variant="subtitle1" id="modal-title">
              {"Rating: " + rating || "N/A"}
            </Typography>
            <Typography variant="subtitle1" id="modal-title">
              {"Distance from First Location : " + distanceA || "N/A"}
            </Typography>
            <Typography variant="subtitle1" id="modal-title">
              {"Time from First Location : " + durationA || "N/A"}
            </Typography>
            <Typography variant="subtitle1" id="modal-title">
              {"Distance from Second Location : " + distanceB || "N/A"}
            </Typography>
            <Typography variant="subtitle1" id="modal-title">
              {"Time from Second Location : " + durationB || "N/A"}
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleModal);
