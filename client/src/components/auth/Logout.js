import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
        <a onClick={this.props.logout} href="#" className="btn btn-dark btn-icon-split ml-2">
          <span className="text">Logout</span>
        </a>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
