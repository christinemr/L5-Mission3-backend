# Welcome to **Mission 3** 🚀

## Overview

A Node.js backend service that powers a mock job interview application using Google Gemini. This application lets a user specify a target job title, then simulate an interview:

- The AI interviewer starts by saying “Tell me about yourself.”

- It will ask at least six follow-up questions based on each user response.

- Questions beyond the first are generated dynamically, not hardcoded.

- At the end, the AI provides feedback on performance and suggestions for improvement.

#### Tech Stack

- Node & Express.js
- Google Gemini API
- dotenv for environment config
- CORS middleware for frontend integration

#### Future Enhancements

- Integrate frontend UI
- Refine prompt logic with prompt engineering support

#### Setup Instruction:

**Clone the repository**

```bash
git clone <repo-url>
cd mission3-backend
```

**Install dependencies**

```bash
npm install
```

**Configure environment variables**

1. Copy the example file (.env.example)
2. Edit .env and set your Gemini API key

**Getting started**

```
npm run dev
```

---

#### 👩🏻‍💻🧑🏻‍💻👨🏻‍💻 Dev mode vibes

Please sit back and relax while Gemini does the interviewing...

<img src="public/READMEimages/mission3.png" alt="meme" width="450"/>
