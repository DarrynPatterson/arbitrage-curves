const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SpotPriceSchema = new Schema({
  lunoZar: {
    type: "String"
  },
  lunoTimestamp: {
    $date: {
      type: "Date"
    }
  },
  cexBtcUsd: {
    type: "String"
  },
  cexBchUsd: {
    type: "String"
  },
  cexBchBtc: {
    type: "String"
  },
  cexTimestamp: {
    $date: {
      type: "Date"
    }
  },
  krakenBtcUsd: {
    type: "String"
  },
  krakenTimestamp: {
    $date: {
      type: "Date"
    }
  },
  krakenLtcUsd: {
    type: "String"
  },
  coinBaseBtcUsd: {
    type: "String"
  },
  coinBaseLtcUsd: {
    type: "String"
  },
  coinBaseLtcZar: {
    type: "String"
  },
  coinBaseTimestamp: {
    $date: {
      type: "Date"
    }
  },
  coinDeskBtcUsd: {
    type: "String"
  },
  coinDeskBtcZar: {
    type: "String"
  },
  coinDeskTimestamp: {
    $date: {
      type: "Date"
    }
  },
  bitcoinAverageUsdZar: {
    type: "String"
  },
  bitcoinAverageTimestamp: {
    $date: {
      type: "Date"
    }
  }
});

module.exports = SpotPrice = mongoose.model(
  "hb_exchangeSnapshots",
  SpotPriceSchema
);
