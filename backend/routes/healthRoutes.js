import express from "express";
import axios from "axios";
import { analyzeSymptoms, getHistory, chatWithDoctor, getChatHistory, getChatSessions, getChatSession, createChatSession } from "../controllers/healthController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze", authMiddleware, analyzeSymptoms);
router.get("/history", authMiddleware, getHistory);
router.post("/chat", authMiddleware, chatWithDoctor);
router.get("/chat-history", authMiddleware, getChatHistory);
router.get("/chat-sessions", authMiddleware, getChatSessions);
router.get("/chat-sessions/:sessionId", authMiddleware, getChatSession);
router.post("/chat-sessions", authMiddleware, createChatSession);

// Test endpoint to check if server is running
router.get("/test", (req, res) => {
  res.json({ message: "Health API is working!" });
});

// Test Gemini API key
router.get("/test-gemini", async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "GEMINI_API_KEY is not set" });
    }
    
    const resp = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: "Hello, this is a test." }] }] }
    );
    
    res.json({ message: "Gemini API is working!", response: resp.data });
  } catch (error) {
    console.error("Gemini test error:", error.response?.data || error.message);
    res.status(500).json({ 
      message: "Gemini API test failed", 
      error: error.response?.data || error.message 
    });
  }
});

// Test database - get all users (for debugging)
router.get("/test-db", async (req, res) => {
  try {
    const User = (await import("../models/User.js")).default;
    const users = await User.find({});
    res.json({ 
      message: "Database test", 
      userCount: users.length,
      users: users.map(u => ({
        uid: u.uid,
        email: u.email,
        historyCount: u.history?.length || 0
      }))
    });
  } catch (error) {
    console.error("Database test error:", error);
    res.status(500).json({ 
      message: "Database test failed", 
      error: error.message 
    });
  }
});

export default router;
