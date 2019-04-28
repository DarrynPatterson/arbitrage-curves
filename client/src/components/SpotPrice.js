import React, { Component } from "react";
import { connect } from "react-redux";
import { getSpotPrices } from "../actions/spotPriceActions";
import PropTypes from "prop-types";
import CardPrice from "./CardPrice";

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
      <div className="row">
        <CardPrice color="primary" name="CoinDesk BTC/USD" value={spotPrices.coinDeskBtcUsd} />
        <CardPrice color="success" name="Kraken BTC/USD" value={spotPrices.krakenBtcUsd} />
        <CardPrice color="info" name="CEX BTC/USD" value={spotPrices.cexBtcUsd} />
        <CardPrice color="warning" name="Luno BTC/ZAR" value={spotPrices.lunoZar} />
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
