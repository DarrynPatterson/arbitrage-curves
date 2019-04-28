import React, { Component } from "react";
import { connect } from "react-redux";

import "../css/App.css";
import "../css/sb-admin-2.min.css";
import "../vendor/fontawesome-free/css/all.min.css";

class Contact extends Component {

  render() {
    return <><i className="fas fa-address-book"></i> <a href="mailto:darryn.patterson@gmail.com">darryn.patterson@gmail.com</a></>;
  }
}

export default connect(
  null,
  null
)(Contact);
