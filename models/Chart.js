const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChartSchema = new Schema({
  dateString: {
    type: "Date"
  },
  lunoLastPriceUsd: {
    type: "Date"
  },
  cexIoLastPriceUsd: {
    type: "Date"
  },
  coinDeskLastPriceUsd: {
    type: "Date"
  },
  krakenLastPriceUsd: {
    type: "Date"
  }
});

module.exports = Chart = mongoose.model("hb_lunoArbitrage", ChartSchema);
