import React, { Component } from "react";
import { Container } from "reactstrap";
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
      <Container>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            title: "Price",
            series: [{ name: "Price Series", data: this.props.chart.items }]
          }}
        />
      </Container>
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
