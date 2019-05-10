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
    const { classes, card, params  } = this.props;
    const { name, rating, address, distanceA, distanceB, durationA, durationB } = card
    const firstLoc = decodeURI(params.first);
    const secondLoc = decodeURI(params.second);

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
              {"Mode of transportation: " + params.mode || "N/A"}
            </Typography>
            <Typography variant="subtitle1" id="modal-title">
              {`Distance from ${firstLoc}: ${distanceA}` || "N/A"}
            </Typography>
            <Typography variant="subtitle1" id="modal-title">
              {`Time from ${firstLoc}: ${durationA}` || "N/A"}
            </Typography>
            <Typography variant="subtitle1" id="modal-title">
              {`Distance from ${secondLoc}: ${distanceB}` || "N/A"}
            </Typography>
            <Typography variant="subtitle1" id="modal-title">
              {`Time from ${secondLoc}: ${durationB}` || "N/A"}
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
