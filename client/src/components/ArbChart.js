import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { connect } from "react-redux";
import { getArbChart } from "../actions/arbChartActions";
import PropTypes from "prop-types";

class Chart extends Component {
  static propTypes = {
    arbChart: PropTypes.object.isRequired,
    getArbChart: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getArbChart();
  }

  render() {
    return (
      <>
        {!this.props.arbChart.isLoading && <HighchartsReact highcharts={Highcharts} options={{title: "Price", series: this.props.arbChart.items}} />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  arbChart: state.arbChart
});

export default connect(
  mapStateToProps,
  { getArbChart }
)(Chart);
