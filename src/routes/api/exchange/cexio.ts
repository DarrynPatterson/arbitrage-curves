import express, { Request, Response } from "express";
const router = express.Router();
import config from "config";

// CEX.IO
import CEXIO from "cexio-api-node";
const cexioClientId = config.get("cexio.clientId");
const cexioKey = config.get("cexio.key");
const cexioSecret = config.get("cexio.secret");

// Exchange APIs
const cexioPublicApi = new CEXIO().rest;
const cexioPrivateApi = new CEXIO(cexioClientId, cexioKey, cexioSecret).rest;

// @route   GET api/exchange/cexio/orderbook
// @desc    Get cexio orderbook
// @access  Public
router.get("/orderbook", (req: Request, res: Response) => {
  const pair = "BTC/USD";
  const orderBookDepth = 2;
  cexioPublicApi.orderbook(pair, orderBookDepth, (err: any, data: any) => {
    if (err) return res.status(400).json({ msg: "Order book not found" });

    // Map asks
    const asks = data.asks.map((item: any) => {
      return {
        price: item[0],
        volume: item[1]
      };
    });

    // Map bids
    const bids = data.bids.map((item: any) => {
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
router.get("/accountbalance", (req: Request, res: Response) => {
  cexioPrivateApi.account_balance((err: any, data: any) => {
    if (err) return res.status(400).json({ msg: "Account balance not found" });

    const result = {
      USD: {
        available: parseFloat(data.USD.available)
      },
      BTC: {
        available: parseFloat(data.BTC.available)
      },
      BCH: {
        available: parseFloat(data.BCH.available)
      },
      BTG: {
        available: parseFloat(data.BTG.available)
      },
      LTC: {
        available: parseFloat(data.LTC.available)
      }
    };
    res.json(result);
  });
});

// @route   GET api/exchange/cexio/openorders
// @desc    Get cexio open orders
// @access  Public
router.get("/openorders", (req: Request, res: Response) => {
  const pair = req.query.pair;

  // Format = BTC/USD
  if (!pair) {
    return res.status(400).json({ msg: "No 'pair' query param was provided" });
  }

  cexioPrivateApi.open_orders(pair, (err: any, data: any) => {
    if (err)
      return res.status(400).json({ msg: "Open orders not found", error: err });

    res.json(data);
  });
});

// @route   PUT api/exchange/cexio/cancelorders
// @desc    Cancel all cexio open orders
// @access  Public
router.put("/cancelorders", (req: Request, res: Response) => {
  const pair = req.query.pair;

  // Format = BTC/USD
  if (!pair) {
    return res.status(400).json({ msg: "No 'pair' query param was provided" });
  }

  cexioPrivateApi.cancel_pair_orders(pair, (err: any, data: any) => {
    if (err)
      return res.status(400).json({
        msg: `Orders not cancelled`,
        error: err
      });

    res.json(data);
  });
});

// @route   POST api/exchange/cexio/buyorder
// @desc    Place a cexio buy order
// @access  Public
router.post("/buyorder", (req: Request, res: Response) => {
  const pair = req.query.pair;

  // Format = BTC/USD
  if (!pair) {
    return res.status(400).json({ msg: "No 'pair' query param was provided" });
  }

  const orderType = "buy";
  const volume = parseFloat(req.body.volume);
  const price = parseFloat(req.body.price);

  cexioPrivateApi.place_order(
    pair,
    orderType,
    volume,
    price,
    null,
    (err: any, data: any) => {
      if (err)
        return res.status(400).json({
          msg: "Order not submitted",
          error: err
        });
      res.json(data);
    }
  );
});

// @route   POST api/exchange/cexio/sellorder
// @desc    Place a cexio sell order
// @access  Public
router.post("/sellorder", (req: Request, res: Response) => {
  const pair = req.query.pair;

  // Format = BTC/USD
  if (!pair) {
    return res.status(400).json({ msg: "No 'pair' query param was provided" });
  }

  const orderType = "sell";
  const volume = parseFloat(req.body.volume);
  const price = parseFloat(req.body.price);

  cexioPrivateApi.place_order(
    pair,
    orderType,
    volume,
    price,
    null,
    (err: any, data: any) => {
      if (err)
        return res.status(400).json({
          msg: "Order not submitted",
          error: err
        });
      res.json(data);
    }
  );
});

module.exports = router