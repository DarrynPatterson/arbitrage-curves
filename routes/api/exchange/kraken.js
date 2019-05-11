const express = require("express");
const router = express.Router();
const config = require("config");

// Kraken
const krakenKey = config.get("kraken.key");
const krakenSecret = config.get("kraken.secret");
const kraken = require("node-kraken-api");

// Exchange APIs
const krakenApi = kraken({
  key: krakenKey,
  secret: krakenSecret
  //tier: "1"
});

// @route   GET api/exchange/kraken/orderbook
// @desc    Get kraken orderbook
// @access  Public
router.get("/orderbook", (req, res) => {
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

// @route   GET api/exchange/kraken/accountbalance
// @desc    Get kraken account balance
// @access  Public
router.get("/accountbalance", (req, res) => {
  krakenApi
    .call("Balance")
    .then(data => {
      const result = {
        BTC: {
          available: data.XBTC ? data.XBTC : 0
        },
        USD: {
          available: data.ZUSD ? data.ZUSD : 0
        }
      };

      res.json(result);
    })
    .catch(err => console.error(err));
});

// @route   GET api/exchange/kraken/openorders
// @desc    Get kraken open orders
// @access  Public
router.get("/openorders", (req, res) => {
  const pair = "BTCUSD";
  krakenApi
    .call("OpenOrders", { trades: false })
    .then(data => {
      let result = [];
      const openOrders = data.open;
      for (let orderId in openOrders) {
        const info = openOrders[orderId];
        if (info.descr.pair === pair) {
          result.push({ orderId, info });
        }
      }

      res.json(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400).json({ msg: err });
    });
});

// @route   PUT api/exchange/kraken/cancelorders
// @desc    Cancel all kraken open orders
// @access  Public
router.put("/cancelorders", (req, res) => {
  const pair = "BTCUSD";

  // Get open orders
  krakenApi
    .call("OpenOrders", { trades: false })
    .then(data => {
      let result = [];
      const openOrders = data.open;
      for (let orderId in openOrders) {
        const info = openOrders[orderId];
        if (info.descr.pair === pair) {
          result.push(orderId);

          // Cancel order
          krakenApi
            .call("CancelOrder", { txid: orderId })
            .then(data => console.log(`Canelled order id: ${orderId}`))
            .catch(err => {
              console.error(err);
              return res.status(400).json({ msg: err });
            });
        }
      }

      // Return cancelled order ids
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(400).json({ msg: err });
    });
});

// @route   POST api/exchange/kraken/buyorder
// @desc    Place a kraken buy order
// @access  Public
router.post("/buyorder", (req, res) => {
  const pair = "BTCUSD";
  const type = "buy";
  const ordertype = "limit";
  const price = parseFloat(req.body.price);
  const volume = parseFloat(req.body.volume);

  krakenApi
    .call("AddOrder", { pair, type, ordertype, price, volume })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      return res.status(400).json({ msg: err });
    });
});

// @route   POST api/exchange/kraken/sellorder
// @desc    Place a kraken sell order
// @access  Public
router.post("/sellorder", (req, res) => {
  const pair = "BTCUSD";
  const type = "sell";
  const ordertype = "limit";
  const price = parseFloat(req.body.price);
  const volume = parseFloat(req.body.volume);

  krakenApi
    .call("AddOrder", { pair, type, ordertype, price, volume })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      return res.status(400).json({ msg: err });
    });
});

module.exports = router;
