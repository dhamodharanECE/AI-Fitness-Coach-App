require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const app = express();

// 1. CORS Configuration
app.use(cors({ 
  origin: [
    "https://project-om6h9pz9j-dhamodharan-ss-projects.vercel.app",
    "https://ai-fitness-coach-app-frontend.vercel.app",
  ],
  methods: ["GET", "POST"],
  credentials: true
})); 

app.use(express.json());

// 2. Initialize Gemini with JSON Mode and Safety Settings
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  // IMPORTANT: This forces the AI to return ONLY valid JSON, no Regex needed
  generationConfig: { 
    responseMimeType: "application/json" 
  },
  // IMPORTANT: This prevents the AI from blocking fitness advice erroneously
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    }
  ]
});

// --- ROUTE: Generate Plan ---
app.post('/api/generate-plan', async (req, res) => {
  const { name, goal, level, dietary } = req.body;
  
  console.log(`Generating plan for: ${name} (${goal})...`);

  // Optimized prompt for JSON mode
  const prompt = `
    Generate a fitness and diet plan for:
    User: ${name}, Goal: ${goal}, Level: ${level}, Diet: ${dietary}.
    
    Return a JSON object with this specific schema:
    {
      "motivation": "string",
      "tips": ["string", "string"],
      "weekly_workout": [
        { "day": "string", "exercises": [{ "name": "string", "sets": "string", "reps": "string", "rest": "string" }] }
      ],
      "weekly_diet": [
        { "day": "string", "meals": { "breakfast": "string", "lunch": "string", "dinner": "string", "snacks": "string" } }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response; // Removed 'await' here
    const text = response.text();
    
    // Parse the JSON directly
    const plan = JSON.parse(text);

    res.json(plan);
    console.log(res);
  } catch (err) {
    console.error("Backend Error:", err);
    
    // Handle Safety Blocks specifically
    if (err.response && err.response.promptFeedback && err.response.promptFeedback.blockReason) {
        return res.status(500).json({ error: "The AI blocked the response due to safety settings." });
    }

    res.status(500).json({ error: "Failed to generate plan. Please try again." });
  }
});

// --- ROUTE: Image Fallback ---
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });
    
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " fitness gym realistic lighting")}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Image Gen Error:", error);
    res.status(500).json({ error: "Image generation failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
