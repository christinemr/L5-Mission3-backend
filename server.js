"use strict";
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

// load environment variables
require("dotenv").config();

// load API key from .env
const API_KEY = process.env.GEMINI_API_KEY;

// init Gemini client
const genAI = new GoogleGenerativeAI(API_KEY);

// middleware
app.use(cors());

app.post("/interview", async (req, res) => {
  // extract job title & user's response from the request body
  const { jobTitle, userResponse } = req.body;

  // error handling - if either one input is missing
  if (!jobTitle || !userResponse) {
    return res
      .status(400)
      .json({ error: "please input job title or user response." });
  }

  try {
    // init Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // TODO: add prompt msg & bg theme ⬇️
    // This is a test prompt—remove or replace before prod
    const initialPrompt = `You are a professional job interviewer. Interview the user for the role of "${jobTitle}". Start by saying "Tell me about yourself." Then ask at least 6 follow-up questions based on the user's answers. Use their responses to guide the interview. At the end, give feedback on how they performed and how they can improve.`;

    // generate AI response and reply
    const geminiResponse = await model.generateContent(initialPrompt);
    const geminiReply = geminiResponse.response.text();

    res.json({ response: geminiReply });
  } catch (error) {
    //error handling
    console.error("❌ error generating text ❌");
    res.status(400).json({ error: "Nooooooo! Failed to generate text 😭" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
