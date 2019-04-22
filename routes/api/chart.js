const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Chart Model
const Chart = require("../../models/Chart");

// @route   GET api/chart
// @desc    Get chart
// @access  Public
router.get("/", (req, res) => {
  const mockData = [
    {
      dateString: "2019-04-22 09:55:00",
      coinDeskLastPriceUsd: "5305"
    },
    {
      dateString: "2019-04-22 10:00:00",
      coinDeskLastPriceUsd: "5310"
    }
  ];

  // Chart.find({})
  //      .limit(30)
  //      .then(items => {
  //        if(!items) return res.status(400).json({ msg: 'Chart data does not exist' });

  //        res.json(items);
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   });

  res.json(mockData);
});

module.exports = router;
