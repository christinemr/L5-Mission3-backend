"use strict";
const express = require("express");
const cors = require("cors");
import { GoogleGenAI } from "@google/genai";

const app = express();

// load environment viarables
require("dotenv").config();

// load API key from .env
const API_KEY = process.env.GEMINI_API_KEY;

// init Gemini client
const genAI = new GoogleGenAI(API_KEY);

// middleware
app.use(cors());

app.post("/interview", (req, res) => {
  res.send("hello world!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
