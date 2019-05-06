import React, { Component } from "react";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
// import NavBar from "../../components/NavBar";
// import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
import Tab from "../../components/Tab";
import FormButton from "../../components/FormButton";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
// import MapAutoComplete from "../../components/MapAutoComplete";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationA: "",
      locationB: "",
      pointOfInterest: ""
    };
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes } = this.props;
    // const { autoCompleteService, geoCoderService } = this.state;

    return (
      <div className="Site">
        <Grid container justify={"center"} spacing={24}>
          <Grid item xs={9}>
            <FormContainer>
              <FormInput
                placeholder={"First Location"}
                name={"locationA"}
                value={this.state.locationA}
                handleChange={this.handleChange}
              />
              <FormInput
                placeholder={"Second Location"}
                name={"locationB"}
                value={this.state.locationB}
                handleChange={this.handleChange}
              />
              <FormInput
                placeholder={"Point of Interest"}
                name={"pointOfInterest"}
                value={this.state.pointOfInterest}
                handleChange={this.handleChange}
              />
              {/* <MapAutoComplete
                autoCompleteService={autoCompleteService}
                geoCoderService={geoCoderService}
                // americaLatLng={americaLatLng}
                // markerName={name}
                // addMarker={this.addMarker}
              /> */}
            </FormContainer>
            <Tab />
            <div className="row">
              <FormButton name={"SUBMIT"} to={`/map?from=${this.state.locationA}&to=${this.state.locationB}&point=${this.state.pointOfInterest}`} />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
