import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Chart from "./Chart";
import SpotPrice from "./SpotPrice";

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
        <SpotPrice />
        <Chart />
      </>
    );

    const guestContent = (
      <>
        <SpotPrice />
      </>
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
