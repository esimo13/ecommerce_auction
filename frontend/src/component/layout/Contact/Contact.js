import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:registrar@juniv.edu">
        <Button>Contact: registrar@juniv.edu</Button>
      </a>
    </div>
  );
};

export default Contact;
