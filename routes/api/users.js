const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Mailer = require("../../services/Mailer");

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
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
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          
          // Send registration email
          const body = `Hi ${user.name}
          <br/><br/>
          Thanks for signing up to <a href='coinarbitrage.xyz'>Coin Arbitrage</a>!
          <br/><br/>
          Your account is now <b>active</b>.
          <br/><br/>
          All the best,
          <br/>
          Darryn`;

          Mailer.sendMail(
            (from = "no-reply@coinarbitrage.xyz"),
            (to = user.email),
            (subject = "Welcome to Coin Arbitrage"),
            body
          );

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
