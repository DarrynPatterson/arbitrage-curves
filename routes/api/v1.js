const express = require("express");
const router = express.Router();
const moment = require("moment");
const auth = require("../../middleware/auth");

// Models
const Chart = require("../../models/Chart");
const SpotPrice = require("../../models/SpotPrice");

// @route   GET api/v1/chart
// @desc    Get chart data
// @access  Public
router.get("/chart", (req, res) => {
  const pastMoment = moment()
    .utc()
    .subtract(14, "hours")
    .format("YYYYMMDD");
  const pastMomentUtc = moment(pastMoment)
    .utc()
    .valueOf();

  Chart.find({ dateUtc: { $gt: pastMomentUtc } })
    .select({})
    .then(items => {
      if (!items)
        return res.status(400).json({ msg: "No chart data available" });

      res.json(items);
    })
    .catch(err => {
      return res.status(400).json({ msg: "Chart data not found" });
    });
});

// @route   GET api/v1/spotprices
// @desc    Get chart spot prices
// @access  Public
router.get("/spotprices", (req, res) => {
  SpotPrice.find({})
    .select({})
    .then(items => {
      if (!items && items.length > 0)
        return res.status(400).json({ msg: "No spot price data available" });

      const data = items[0];
      const result = {
        coinDeskBtcUsd: `$${parseFloat(data.coinDeskBtcUsd).toFixed(2)}`,
        krakenBtcUsd: `$${parseFloat(data.krakenBtcUsd).toFixed(2)}`,
        cexBtcUsd: `$${parseFloat(data.cexBtcUsd).toFixed(2)}`,
        lunoZar: `R${parseFloat(data.lunoZar).toFixed(2)}`
      };

      res.json(result);
    })
    .catch(err => {
      res.status(400).json({ msg: "Spot price data not found" });
    });
});

module.exports = router;
