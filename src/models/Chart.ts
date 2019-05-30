import mongoose from "mongoose";
let Schema = mongoose.Schema;

// Create Schema
let ChartSchema = new Schema({
  dateString: {
    type: "Date"
  },
  lunoLastPriceUsd: {
    type: "String"
  },
  cexIoLastPriceUsd: {
    type: "String"
  },
  coinDeskLastPriceUsd: {
    type: "String"
  },
  krakenLastPriceUsd: {
    type: "String"
  }
});

const Chart = mongoose.model("hb_lunoArbitrage", ChartSchema);

export default Chart;