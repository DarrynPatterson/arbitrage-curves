import express, { Request, Response } from "express";
const router = express.Router();
import moment from "moment";
import auth from "../../middleware/auth";

// Models
import Chart from "../../models/Chart";
import SpotPrice from "../../models/SpotPrice";

// @route   GET api/v1/chart
// @desc    Get chart data
// @access  Public
router.get("/chart", (req: Request, res: Response) => {
  const pastMoment = moment()
    .utc()
    .subtract(14, "hours")
    .format("YYYYMMDD");
  const pastMomentUtc = moment(pastMoment)
    .utc()
    .valueOf();

  Chart.find({ dateUtc: { $gt: pastMomentUtc } })
    .select({})
    .then((items: any) => {
      if (!items)
        return res.status(400).json({ msg: "No chart data available" });

      res.json(items);
    })
    .catch((err: any) => {
      return res.status(400).json({ msg: "Chart data not found" });
    });
});

// @route   GET api/v1/spotprices
// @desc    Get chart spot prices
// @access  Public
router.get("/spotprices", (req: Request, res: Response) => {
  SpotPrice.find({})
    .select({})
    .then((items: any) => {
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
    .catch((err: any) => {
      res.status(400).json({ msg: "Spot price data not found" });
    });
});

module.exports = router;