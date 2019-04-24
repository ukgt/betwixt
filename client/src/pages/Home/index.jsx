import React from "react";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tab from "../../components/Tab";
//import "./style.css";

export default function Home(props) {
  return (
    <div className="Site">
      <div className="container">
          <FormContainer>
            <FormInput placeholder={"First Location"} />
            <FormInput placeholder={"Second Location"} />
            <FormInput placeholder={"Point of Interest"} />
          </FormContainer>
          <Tab />
        <div className="row">
          <Button
            size="large"
            variant="contained"
            color="primary"
            component={Link}
            to="/map"
          >
            sumbit
          </Button>
        </div>
      </div>
    </div>
  );
}
