import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Chart from "./Chart";

class ContentArea extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authContent = (
      <>
        <Chart />
      </>
    );

    const guestContent = (
      <div>Guest Content</div>
    );

    return <div>{isAuthenticated ? authContent : guestContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(ContentArea);
