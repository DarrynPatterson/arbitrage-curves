import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ArbChart from "./ArbChart";
import SpotPrice from "./SpotPrice";

class Dashboard extends Component {
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
        <ArbChart />
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
)(Dashboard);
