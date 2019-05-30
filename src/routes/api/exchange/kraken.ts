import express, { Request, Response } from "express";
const router = express.Router();
import config from "config";

// Kraken
const krakenKey = config.get("kraken.key");
const krakenSecret = config.get("kraken.secret");
import kraken from "node-kraken-api";

// Exchange APIs
const krakenApi = kraken({
  key: krakenKey,
  secret: krakenSecret
});

// @route   GET api/exchange/kraken/orderbook
// @desc    Get kraken orderbook
// @access  Public
router.get("/orderbook", (req: Request, res: Response) => {
  const pair = "XXBTZUSD";
  const orderBookDepth = 2;
  krakenApi
    .call("Depth", { pair, count: orderBookDepth })
    .then((data: any) => {
      // Map asks
      const asks = data[pair].asks.map((item: any) => {
        return {
          price: item[0],
          volume: item[1]
        };
      });

      // Map bids
      const bids = data[pair].bids.map((item: any) => {
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
    .catch((err: any) => {
      res.status(400).json({ msg: "Order book not found" });
    });
});

// @route   GET api/exchange/kraken/accountbalance
// @desc    Get kraken account balance
// @access  Public
router.get("/accountbalance", (req: Request, res: Response) => {
  krakenApi
    .call("Balance")
    .then((data: any) => {
      const result = {
        USD: {
          available: data.ZUSD ? data.ZUSD : 0
        },
        BTC: {
          available: data.XBTC ? data.XBTC : 0
        },
        BCH: {
          available: data.BCH ? data.BCH : 0
        },
        BTG: {
          available: data.BTG ? data.BTG : 0
        },
        LTC: {
          available: data.XLTC ? data.XLTC : 0
        }
      };

      res.json(result);
    })
    .catch((err: any) => res.status(400).json({ msg: "Account balance not found" }));
});

// @route   GET api/exchange/kraken/openorders
// @desc    Get kraken open orders
// @access  Public
router.get("/openorders", (req: Request, res: Response) => {
  const pair = req.query.pair;

  // Format = BTCUSD
  if (!pair) {
    return res.status(400).json({ msg: "No 'pair' query param was provided" });
  }

  krakenApi
    .call("OpenOrders", { trades: false })
    .then((data: any) => {
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
    .catch((err: any) => {
      return res.status(400).json({ msg: "Open orders not found", error: err });
    });
});

// @route   PUT api/exchange/kraken/cancelorders
// @desc    Cancel all kraken open orders
// @access  Public
router.put("/cancelorders", (req: Request, res: Response) => {
  const pair = req.query.pair;

  // Format = BTCUSD
  if (!pair) {
    return res.status(400).json({ msg: "No 'pair' query param was provided" });
  }

  // Get open orders
  krakenApi
    .call("OpenOrders", { trades: false })
    .then((data: any) => {
      let result = [];
      const openOrders = data.open;
      for (let orderId in openOrders) {
        const info = openOrders[orderId];
        if (info.descr.pair === pair) {
          result.push(orderId);

          // Cancel order
          krakenApi
            .call("CancelOrder", { txid: orderId })
            .then((data: any) => res.json({ msg: `Cancelled order id: ${orderId}` }))
            .catch((err: any) => {
              return res.status(400).json({
                msg: `Order id: ${orderId} not cancelled`,
                error: err
              });
            });
        }
      }

      // Return cancelled order ids
      res.json(result);
    })
    .catch((err: any) => {
      return res.status(400).json({ msg: "Open orders not found", error: err });
    });
});

// @route   POST api/exchange/kraken/buyorder
// @desc    Place a kraken buy order
// @access  Public
router.post("/buyorder", (req: Request, res: Response) => {
  const pair = req.query.pair;

  // Format = BTCUSD
  if (!pair) {
    return res.status(400).json({ msg: "No 'pair' query param was provided" });
  }

  const type = "buy";
  const ordertype = "limit";
  const price = parseFloat(req.body.price);
  const volume = parseFloat(req.body.volume);

  krakenApi
    .call("AddOrder", { pair, type, ordertype, price, volume })
    .then((data: any) => {
      res.json(data);
    })
    .catch((err: any) => {
      return res.status(400).json({
        msg: "Order not submitted",
        error: err
      });
    });
});

// @route   POST api/exchange/kraken/sellorder
// @desc    Place a kraken sell order
// @access  Public
router.post("/sellorder", (req: Request, res: Response) => {
  const pair = req.query.pair;

  // Format = BTCUSD
  if (!pair) {
    return res.status(400).json({ msg: "No 'pair' query param was provided" });
  }

  const type = "sell";
  const ordertype = "limit";
  const price = parseFloat(req.body.price);
  const volume = parseFloat(req.body.volume);

  krakenApi
    .call("AddOrder", { pair, type, ordertype, price, volume })
    .then((data: any) => {
      res.json(data);
    })
    .catch((err: any) => {
      return res.status(400).json({
        msg: "Order not submitted",
        error: err
      });
    });
});

module.exports = router