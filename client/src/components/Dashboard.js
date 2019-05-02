import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ArbChart from "./ArbChart";
import SpotPrice from "./SpotPrice";
import RegisterModal from "./auth/RegisterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    arbChart: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authContent = (
      <>
        <SpotPrice />
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Exchange Arbitrage
            </h6>
          </div>
          <div className="card-body">
            {this.props.arbChart.isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
            <ArbChart />
          </div>
        </div>
      </>
    );

    const guestContent = (
      <>
        <SpotPrice />
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Sign Up</h6>
          </div>
          <div className="card-body">
            <div className="mb-4">
              Sign Up to Coin Arbitrage to view advanced arbitrage charts.
            </div>
            <RegisterModal />
          </div>
        </div>
      </>
    );

    return <div>{isAuthenticated ? authContent : guestContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  arbChart: state.arbChart
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
