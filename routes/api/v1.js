const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const moment = require("moment");

// Models
const Chart = require("../../models/Chart");
const SpotPrice = require("../../models/SpotPrice");

// @route   GET api/chart
// @desc    Get chart data
// @access  Public
router.get("/chart", (req, res) => {
  const yesterday = moment().utc().subtract(1, "days").format("YYYYMMDD");
  const yesterdayUtc = moment(yesterday).utc().valueOf();

  Chart.find({ dateUtc: { $gt: yesterdayUtc } })
    .select({})
    .then(items => {
      if (!items) return res.status(400).json({ msg: "Chart data not found" });

      res.json(items);
    })
    .catch(err => {
      console.error(err);
    });
});

// @route   GET api/chart/spotprices
// @desc    Get chart spot prices
// @access  Public
router.get("/spotprices", (req, res) => {
  SpotPrice.find({})
    .select({})
    .then(items => {
      if (!items && items.length > 0)
        return res.status(400).json({ msg: "Spot price data not found" });

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
      console.error(err);
    });
});

module.exports = router;
