require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// 1. Allow Frontend connection (Vercel)
// IMPORTANT: No trailing slash "/" at the end of the URL
app.use(cors({ 
  origin: [
    "https://ai-fitness-coach-app-rho.vercel.app", // Your deployed frontend
    "http://localhost:3000", // Keep this if you still want to test locally
    "http://localhost:5173"  // Standard Vite local port
  ],
  methods: ["GET", "POST"],
  credentials: true
})); 

app.use(express.json());

// 2. Check API Key
console.log("API Key Status:", process.env.GOOGLE_API_KEY ? "Loaded" : "MISSING");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// 3. Model Configuration
// WARNING: "gemini-2.5-flash" does not exist yet. Using "gemini-1.5-flash".
// If you get a 404 error, change this string to "gemini-pro".
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- HELPER: Extract JSON from text ---
const extractJSON = (text) => {
  try {
    // 1. Try finding content between ```json and ```
    const match = text.match(/```json([\s\S]*?)```/);
    if (match && match[1]) return JSON.parse(match[1]);

    // 2. Try finding the first '{' and last '}'
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      const cleanJson = text.substring(jsonStart, jsonEnd + 1);
      return JSON.parse(cleanJson);
    }
    
    // 3. Last resort: Try parsing the whole text
    return JSON.parse(text);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    return null;
  }
};

// --- ROUTE: Generate Plan ---
app.post('/api/generate-plan', async (req, res) => {
  const { name, goal, level, dietary } = req.body;
  
  console.log(`Generating plan for: ${name}...`);

  const prompt = `
    Act as a fitness API. Return ONLY raw JSON. No introductory text.
    User: ${name}, Goal: ${goal}, Level: ${level}, Diet: ${dietary}.
    
    Required JSON Structure:
    {
      "motivation": "A short quote",
      "tips": ["Tip 1", "Tip 2"],
      "weekly_workout": [
        { "day": "Day 1", "exercises": [{ "name": "Pushups", "sets": "3", "reps": "12", "rest": "60s" }] }
      ],
      "weekly_diet": [
        { "day": "Day 1", "meals": { "breakfast": "Oats", "lunch": "Rice", "dinner": "Salad", "snacks": "Nuts" } }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini responded. extracting JSON...");
    
    const plan = extractJSON(text);

    if (!plan) {
      throw new Error("Could not parse JSON from AI response");
    }

    res.json(plan);

  } catch (err) {
    console.error("Backend Error:", err.message);
    res.status(500).json({ error: "Failed to generate plan. Please try again." });
  }
});

// --- ROUTE: Image Fallback ---
app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body;
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " fitness gym")}`;
  res.json({ imageUrl });
});

// Use process.env.PORT for deployment, or 5000 for local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));