import { Request, Response, NextFunction } from "express";
import config from "config";
import jwt from "jsonwebtoken";

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorizaton denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

export default auth;