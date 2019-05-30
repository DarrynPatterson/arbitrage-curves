import express, { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
const router = express.Router();
import config from "config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Services
import Mailer from "../../services/Mailer";

// Models
import User from "../../models/User";

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: "Password must be at least 6 characters long" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err: any, salt: string) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user: Document) => {
          
          // Send registration email
          const from = "no-reply@coinarbitrage.xyz";
          const to = user.email;
          const subject = "Welcome to Coin Arbitrage";
          const body = `Hi ${user.name}
          <br/><br/>
          Thanks for signing up to <a href='coinarbitrage.xyz'>Coin Arbitrage</a>!
          <br/><br/>
          Your account is now <b>active</b>.
          <br/><br/>
          All the best,
          <br/>
          Darryn`;

          Mailer.sendMail(from, to, subject, body);

          // Return token
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;