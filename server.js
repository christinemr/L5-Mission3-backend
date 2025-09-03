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
app.use(cors({ origin: "http://localhost:5173" }));

app.post("/interview", async (req, res) => {
  // extract job title & user's response from the request body
  const { jobTitle, userResponse, history = [] } = req.body;

  // error handling - if either one input is missing
  if (!jobTitle || !userResponse) {
    return res
      .status(400)
      .json({ error: "please input job title or user response." });
  }

  try {
    // init Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // append user's latest response to history
    const updatedHistory = [
      ...history,
      { role: "user", content: userResponse },
    ];

    // keep interview history into a transcript for Gemini - to keep convo flow naturally
    // using array map to loop thru each msg in (updatedHistory) & turn into a single strings
    // ternary expression to check the role
    const interviewLog = interviewHistory
      .map(
        (message) =>
          `${message.role === "user" ? "Candidate" : "Interviewer"}: ${
            message.content
          }`
      )
      .join("\n");

    // TODO: add prompt msg & bg theme ⬇️
    // This is a test prompt—remove or replace before prod
    const initialPrompt = `
    You are a professional job interviewer for the role of "${jobTitle}".
    
    Here is the interview so far: ${interviewLog}}
    
    Based on this conversation, ask the next follow-up question that is related to the role. keep it short and simple.
    Conclude the interview on 5th questions, provide a brief feedback on how the candidate performed and how they can improve. Please respond in plain text only. Do not use asterisks, bold, or italic formatting.

    `;

    // generate AI response and reply
    const geminiResponse = await model.generateContent(initialPrompt);
    const geminiReply = geminiResponse.response.text();

    // add AI reply to history
    interviewHistory.push({ role: "interviewer", content: geminiReply });

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
