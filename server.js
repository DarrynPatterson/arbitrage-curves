const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const logger = require("./middleware/logger");
const app = express();

// Use logger Middleware
app.use(logger);

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
//mongoose.set("debug", true);
mongoose.pluralize(null);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/v1", require("./routes/api/v1"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/exchange/cexio", require("./routes/api/exchange/cexio"));
app.use("/api/exchange/kraken", require("./routes/api/exchange/kraken"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5025;

app.listen(port, () => console.log(`Server started on port ${port}`));
