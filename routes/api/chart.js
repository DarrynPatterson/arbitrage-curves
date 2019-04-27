const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Models
const Chart = require("../../models/Chart");
const SpotPrice = require("../../models/SpotPrice");

// @route   GET api/chart
// @desc    Get chart data
// @access  Public
router.get("/", (req, res) => {
  const startDate = Date.parse("2019-04-27");
  Chart.find({ dateUtc: { $gt: startDate } })
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
      if (!items)
        return res.status(400).json({ msg: "Spot price data not found" });

      res.json(items[0]);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
