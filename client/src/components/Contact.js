import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

import "../css/App.css";
import "../css/sb-admin-2.min.css";

class Contact extends Component {

  render() {
    return <><FontAwesomeIcon icon={faAddressBook} /> <a href="mailto:darryn.patterson@gmail.com">darryn.patterson@gmail.com</a></>;
  }
}

export default connect(
  null,
  null
)(Contact);