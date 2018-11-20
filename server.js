const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const server = express();
const friendRoute = require("./friends/friendRoute");

mongoose
  .connect("mongodb://localhost/beardb")
  .then(mongo => {
    console.log("connected to database");
  })
  .catch(err => console.log("Error connecting to database", err));

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.use("/api/friends", friendRoute);
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}`));
