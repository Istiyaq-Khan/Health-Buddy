import axios from "axios";
import User from "../models/User.js";

export const analyzeSymptoms = async (req, res) => {
  const { symptoms } = req.body;
  const uid = req.user.uid;

  if (!symptoms || !Array.isArray(symptoms)) {
    return res.status(400).json({ message: "Invalid symptoms input" });
  }

  // Check if GEMINI_API_KEY is set
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set");
    return res.status(500).json({ message: "AI service configuration error" });
  }

  try {
    const prompt = `
Analyze these symptoms: ${symptoms.join(", ")}.

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "diseases": ["list of possible diseases"],
  "vitamins": ["recommended vitamins"],
  "medicines": ["over-the-counter medicines"],
  "tips": "home care advice",
  "advisedoctor": ["Please tell me what kind of doctor I should see. Please give me the names and numbers of the doctors in Bangladesh. If you can't give them, just tell me which doctor I should see. Don't write anything else.."],
  "doctorAlert": true/false
}

Important: Return only the JSON object, no markdown markers or any other text. Please answer all questions in Bangla. and tell English in brackets
`;

    console.log("Making request to Gemini API...");
    const resp = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    const txt =
      resp.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      '{"diseases":[],"vitamins":[],"medicines":[],"tips":"","advisedoctor":[],"doctorAlert":false}';

    console.log("Raw Gemini response:", txt);

    let json;
    try {
      // Try to extract JSON from the response if it's wrapped in text
      let jsonText = txt;
      
      // If the response contains JSON, try to extract it
      const jsonMatch = txt.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      }
      
      json = JSON.parse(jsonText);
      
      // Ensure all required fields exist
      json = {
        diseases: json.diseases || [],
        vitamins: json.vitamins || [],
        medicines: json.medicines || [],
        tips: json.tips || "No specific tips available.",
        advisedoctor: json.advisedoctor || [],
        doctorAlert: json.doctorAlert || false
      };
      
      console.log("Parsed JSON:", json);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", txt);
      console.error("Parse error:", parseError);
      
      // Create a fallback response based on the raw text
      const fallbackResponse = {
        diseases: ["Unable to determine specific diseases"],
        vitamins: ["General vitamins like Vitamin C and D"],
        medicines: ["Consult a doctor for proper medication"],
        tips: txt.length > 100 ? txt.substring(0, 200) + "..." : txt,
        advisedoctor: ["Unable to provide a doctor's number based on your condition"],
        doctorAlert: true
      };
      
      json = fallbackResponse;
    }

    try {
      console.log("Saving analysis to database for UID:", uid);
      console.log("Symptoms to save:", symptoms);
      console.log("Result to save:", json);
      
      const updatedUser = await User.findOneAndUpdate(
        { uid },
        {
          uid,
          $push: {
            history: {
              symptoms,
              result: json,
              timestamp: new Date()
            },
          },
        },
        { upsert: true, new: true }
      );
      
      console.log("Database save successful. Updated user:", updatedUser ? "Yes" : "No");
      console.log("User history count:", updatedUser?.history?.length || 0);
    } catch (dbError) {
      console.error("Database error:", dbError.message);
      console.error("Full database error:", dbError);
      // Continue with the response even if database save fails
    }

    return res.json(json);
  } catch (err) {
    console.error("Gemini error:", err.message);
    console.error("Full error:", err);
    return res.status(500).json({ message: "AI analysis failed: " + err.message });
  }
};

export const getHistory = async (req, res) => {
  const uid = req.user.uid;
  console.log("Getting history for UID:", uid);
  
  try {
    const user = await User.findOne({ uid });
    console.log("Found user:", user ? "Yes" : "No");
    console.log("User history:", user?.history);
    
    const history = user?.history || [];
    console.log("Returning history:", history);
    
    return res.json(history);
  } catch (err) {
    console.error("Error in getHistory:", err);
    return res.status(500).json({ message: "Could not fetch history" });
  }
};

export const chatWithDoctor = async (req, res) => {
  const { message, sessionId } = req.body;
  const uid = req.user.uid;

  if (!message || !message.trim()) {
    return res.status(400).json({ message: "Message is required" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ message: "AI service not configured" });
  }

  try {
    const prompt = `
You are an AI Health Assistant. A user is asking about their health problem. 
Please provide helpful advice, solutions, and create a daily routine for them. Please answer all questions in Bangla.and tell english in brackets. 

User's question: ${message}

Please respond with:
1. Understanding of their problem
2. Practical solutions and advice
3. It will analyze my symptoms and which diseases I might have, and based on that, it will give me the names and phone numbers of three Bangladeshi doctors—especially from Sylhet and Dhaka—who can help cure my problem. Only provide the doctors names and numbers
5. When they should see a doctor (if needed)
4. A daily routine to help with their issue


Keep your response helpful, professional, and focused on health and wellness.
`;

    console.log("Sending message to Gemini:", message);
    
    const resp = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    const aiResponse = resp.data.candidates?.[0]?.content?.parts?.[0]?.text || 
                      "I'm sorry, I couldn't process your request. Please try again.";

    console.log("AI response received");

    // Save to database with session
    try {
      if (sessionId) {
        // Add messages to existing session
        await User.findOneAndUpdate(
          { 
            uid,
            "chatSessions._id": sessionId 
          },
          {
            $push: {
              "chatSessions.$.messages": {
                role: 'user',
                content: message,
                timestamp: new Date()
              }
            },
            $set: {
              "chatSessions.$.updatedAt": new Date()
            }
          }
        );

        await User.findOneAndUpdate(
          { 
            uid,
            "chatSessions._id": sessionId 
          },
          {
            $push: {
              "chatSessions.$.messages": {
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date()
              }
            },
            $set: {
              "chatSessions.$.updatedAt": new Date()
            }
          }
        );
      } else {
        // Create new session
        const newSession = {
          title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
          messages: [
            {
              role: 'user',
              content: message,
              timestamp: new Date()
            },
            {
              role: 'assistant',
              content: aiResponse,
              timestamp: new Date()
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await User.findOneAndUpdate(
          { uid },
          { $push: { chatSessions: newSession } },
          { upsert: true }
        );
      }

      console.log("Chat session saved to database");
    } catch (dbError) {
      console.error("Database error saving chat:", dbError.message);
    }

    return res.json({ response: aiResponse });
  } catch (err) {
    console.error("Chat error:", err.message);
    return res.status(500).json({ message: "AI chat failed: " + err.message });
  }
};

export const getChatHistory = async (req, res) => {
  const uid = req.user.uid;
  
  try {
    const user = await User.findOne({ uid });
    const chatHistory = user?.chatHistory || [];
    
    console.log("Returning chat history:", chatHistory.length, "messages");
    
    return res.json(chatHistory);
  } catch (err) {
    console.error("Error in getChatHistory:", err);
    return res.status(500).json({ message: "Could not fetch chat history" });
  }
};

export const getChatSessions = async (req, res) => {
  const uid = req.user.uid;
  
  try {
    const user = await User.findOne({ uid });
    const chatSessions = user?.chatSessions || [];
    
    console.log("Returning chat sessions:", chatSessions.length, "sessions");
    
    return res.json(chatSessions);
  } catch (err) {
    console.error("Error in getChatSessions:", err);
    return res.status(500).json({ message: "Could not fetch chat sessions" });
  }
};

export const getChatSession = async (req, res) => {
  const uid = req.user.uid;
  const { sessionId } = req.params;
  
  try {
    const user = await User.findOne({ uid });
    const session = user?.chatSessions?.find(s => s._id.toString() === sessionId);
    
    if (!session) {
      return res.status(404).json({ message: "Chat session not found" });
    }
    
    console.log("Returning chat session:", sessionId);
    
    return res.json(session);
  } catch (err) {
    console.error("Error in getChatSession:", err);
    return res.status(500).json({ message: "Could not fetch chat session" });
  }
};

export const createChatSession = async (req, res) => {
  const uid = req.user.uid;
  const { title } = req.body;
  
  try {
    const newSession = {
      title: title || 'New Health Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const user = await User.findOneAndUpdate(
      { uid },
      { $push: { chatSessions: newSession } },
      { upsert: true, new: true }
    );
    
    const createdSession = user.chatSessions[user.chatSessions.length - 1];
    
    console.log("Created new chat session:", createdSession._id);
    
    return res.json(createdSession);
  } catch (err) {
    console.error("Error in createChatSession:", err);
    return res.status(500).json({ message: "Could not create chat session" });
  }
};
