const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Chart Model
const Chart = require("../../models/Chart");

// @route   GET api/chart
// @desc    Get chart data
// @access  Public
router.get("/", (req, res) => {
  Chart.find({})
    .select({})
    .limit(1000)
    .sort("-dateString")
    .then(items => {
      if (!items) return res.status(400).json({ msg: "Chart data not found" });

      res.json(items);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
