const express = require("express");
const router = express.Router();
const config = require("config");

// CEX.IO
const CEXIO = require("cexio-api-node");
const cexioClientId = config.get("cexio.clientId");
const cexioKey = config.get("cexio.key");
const cexioSecret = config.get("cexio.secret");

// Exchange APIs
const cexioPublicApi = new CEXIO().rest;
const cexioPrivateApi = new CEXIO(cexioClientId, cexioKey, cexioSecret).rest;

const cexioTicker = "BTC/USD";

// @route   GET api/exchange/cexio/orderbook
// @desc    Get cexio orderbook
// @access  Public
router.get("/orderbook", (req, res) => {
  const orderBookDepth = 2;
  cexioPublicApi.orderbook(cexioTicker, orderBookDepth, (err, data) => {
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

// @route   GET api/exchange/cexio/accountbalance
// @desc    Get cexio account balance
// @access  Public
router.get("/accountbalance", (req, res) => {
  cexioPrivateApi.account_balance((err, data) => {
    if (err) return console.error(err);

    const result = {
      BTC: {
        available: parseFloat(data.BTC.available)
        // orders: data.BTC.orders
      },
      USD: {
        available: parseFloat(data.USD.available)
        // orders: data.USD.orders
      }
    };

    res.json(result);
  });
});

// @route   GET api/exchange/cexio/openorders
// @desc    Get cexio open orders
// @access  Public
router.get("/openorders", (req, res) => {
  cexioPrivateApi.open_orders(cexioTicker, (err, data) => {
    if (err) return console.error(err);
    res.json(data);
  });
});

// @route   PUT api/exchange/cexio/cancelorders
// @desc    Cancel all cexio open orders
// @access  Public
router.put("/cancelorders", (req, res) => {
  cexioPrivateApi.cancel_pair_orders(cexioTicker, (err, data) => {
    if (err) return console.error(err);
    res.json(data);
  });
});

module.exports = router;
