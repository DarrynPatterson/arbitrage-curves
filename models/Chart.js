const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChartSchema = new Schema({
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

module.exports = Chart = mongoose.model("hb_lunoArbitrage", ChartSchema);
