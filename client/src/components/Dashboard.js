import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ArbChart from "./ArbChart";
import SpotPrice from "./SpotPrice";

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authContent = (
      <>
        <SpotPrice />
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Exchange Arbitrage</h6>
          </div>
          <div className="card-body">
            <ArbChart />
          </div>
        </div>
      </>
    );

    const guestContent = (
        <SpotPrice />
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
