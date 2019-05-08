const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const moment = require("moment");
const config = require("config");

// Kraken
const krakenKey = config.get("kraken.key");
const krakenSecret = config.get("kraken.secret");
const kraken = require("node-kraken-api");

// CEX.IO
const CEXIO = require("cexio-api-node");
const cexClientId = config.get("cex.clientId");
const cexKey = config.get("cex.key");
const cexSecret = config.get("cex.secret");

// Exchange APIs
const cexPublicApi = new CEXIO().rest;
const cexPrivateApi = new CEXIO(cexClientId, cexKey, cexSecret).rest;
const krakenApi = kraken({
  key: krakenKey,
  secret: krakenSecret,
  tier: ""
});

// Models
const Chart = require("../../models/Chart");
const SpotPrice = require("../../models/SpotPrice");

// @route   GET api/chart
// @desc    Get chart data
// @access  Public
router.get("/chart", (req, res) => {
  const yesterday = moment()
    .utc()
    .subtract(14, "hours")
    .format("YYYYMMDD");
  const yesterdayUtc = moment(yesterday)
    .utc()
    .valueOf();

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

// @route   GET api/spotprices
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

// @route   GET api/kraken/orderbook
// @desc    Get kraken orderbook
// @access  Public
router.get("/kraken/orderbook", (req, res) => {
  const pair = "XXBTZUSD";
  const orderBookDepth = 2;
  krakenApi
    .call("Depth", { pair, count: orderBookDepth })
    .then(data => {
      // Map asks
      const asks = data[pair].asks.map(item => {
        return {
          price: item[0],
          volume: item[1]
        };
      });

      // Map bids
      const bids = data[pair].bids.map(item => {
        return {
          price: item[0],
          volume: item[1]
        };
      });

      const result = {
        asks,
        bids
      };

      res.json(result);
    })
    .catch(err => console.error(err));
});

// @route   GET api/cex/orderbook
// @desc    Get cex orderbook
// @access  Public
router.get("/cex/orderbook", (req, res) => {
  const pair = "BTC/USD";
  const orderBookDepth = 2;
  cexPublicApi.orderbook(pair, orderBookDepth, (err, data) => {
    if (err) return console.error(err);

    // Map asks
    const asks = data.asks.map(item => {
      return {
        price: item[0],
        volume: item[1]
      };
    });

    // Map bids
    const bids = data.bids.map(item => {
      return {
        price: item[0],
        volume: item[1]
      };
    });

    const result = {
      asks,
      bids
    };

    res.json(result);
  });
});

module.exports = router;
