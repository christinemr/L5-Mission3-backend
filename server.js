"use strict";
const express = require("express");
const cors = require("cors");

const app = express();

// load environment viarables
require("dotenv").config();

// middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
