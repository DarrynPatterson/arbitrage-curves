import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { connect } from "react-redux";
import { getArbChart } from "../actions/arbChartActions";
import PropTypes from "prop-types";

class Chart extends Component {
  static propTypes = {
    getArbChart: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getArbChart();
  }

  render() {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: "Price",
          series: this.props.chart.items
        }} />
    );
  }
}

const mapStateToProps = state => ({
  chart: state.chart
});

export default connect(
  mapStateToProps,
  { getArbChart }
)(Chart);
