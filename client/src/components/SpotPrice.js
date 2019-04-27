import React, { Component } from "react";
import { connect } from "react-redux";
import { getSpotPrices } from "../actions/spotPriceActions";
import PropTypes from "prop-types";

class SpotPrice extends Component {
  static propTypes = {
    getSpotPrices: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getSpotPrices();
  }

  render() {
    const { spotPrices } = this.props.spotPrices;

    return (
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-success shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Kraken BTC/USD
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  ${spotPrices.krakenBtcUsd}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotPrices: state.spotPrices
});

export default connect(
  mapStateToProps,
  { getSpotPrices }
)(SpotPrice);
