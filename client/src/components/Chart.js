import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { connect } from "react-redux";
import { getChart } from "../actions/chartActions";
import PropTypes from "prop-types";

class Chart extends Component {
  static propTypes = {
    getChart: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getChart();
  }

  render() {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: "Price",
          series: this.props.chart.items
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  chart: state.chart
});

export default connect(
  mapStateToProps,
  { getChart }
)(Chart);
