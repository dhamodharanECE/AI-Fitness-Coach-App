# 🏋️‍♂️ AI Fitness Coach

An AI-powered web application that generates fully personalized workout routines and diet plans based on user goals, body 

type, and dietary preferences. Powered by **Google Gemini AI** for intelligence and **Pollinations.ai** for visual generation.

# 🚀 Features

- **Personalized Plans:** Generates 7-day workout and diet schedules using LLMs.

- **AI Visuals:** Generates realistic images for exercises and meals on the fly.

- **Voice Assistant:** Reads out the workout plan using the Web Speech API.

- **PDF Export:** Download professional, multi-page PDF plans.

- **Modern UI:** Built with React, Tailwind CSS, and Framer Motion animations.

# 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Axios, jsPDF.

- **Backend:** Node.js, Express.js, Google Gemini API.

- **External APIs:** Google Gemini (Text), Pollinations.ai (Images).

# 📂 Project Structure

```
/ai-fitness-coach
├── /backend         # Node.js Server & API Logic
└── /frontend   
```
# ⚡ Quick Start

You need to run the Backend and Frontend in two separate terminals.

Terminal 1: Backend

code
Bash
```
cd backend
```
```
npm install
```
# Setup your .env file (see backend/README.md)
```
node server.js
```
Terminal 2: Frontend

code
Bash
```
cd frontend
```
```
npm install

```
```
npm run dev
```

2. Backend README

File Location: backend/README.md

code
Markdown

# 🧠 AI Fitness Coach - Backend

This is the server-side application for the AI Fitness Coach. It handles communication with the Google Gemini API to generate 

JSON-structured fitness data.

# ⚙️ Setup & Installation

1. **Navigate to the directory:**

```bash
   cd backend
```
Install dependencies:

code
Bash
```
npm install express cors dotenv @google/generative-ai
```

Configure Environment Variables:

Create a file named .env in the backend folder and add your API Key:

code
Env
```
PORT=5000
```
# Get this key from 
```
https://aistudio.google.com/
```
```
GOOGLE_API_KEY=AIzaSyD_Your_Actual_Key_Here
```

Run the Server:

code
Bash
```
node server.js
```

You should see: Backend running on port 5000

# 📡 API Endpoints

# 1. Generate Plan

POST /api/generate-plan

Body: { name, age, weight, goal, level, location, dietary }

Response: JSON object containing weekly_workout, weekly_diet, motivation, and tips.

# 2. Generate Image
```
POST /api/generate-image
Body: { prompt: "Squats" }
Response: { imageUrl: "https://..." }
```
# AI Image Generation:

Note: Uses Pollinations.ai fallback.

# 🐛 Troubleshooting:

404 Not Found (Gemini):

Ensure you are using gemini-pro in server.js if gemini-1.5-flash is not available in your region.

CORS Errors:

Ensure cors is enabled in server.js for 
```
http://localhost:3000 (or 5173 depending on your Vite port).
```

# 3. Frontend README

**File Location:** `frontend/README.md`

# 🎨 AI Fitness Coach - Frontend

The user interface for the fitness application. Built with **Vite + React** for speed and performance.

# 📦 Setup & Installation

1. **Navigate to the directory:**

```
cd frontend
```

Install dependencies:

code
Bash
```
npm install axios framer-motion lucide-react jspdf
```
(If you encounter version errors with Framer Motion, run:
```
npm install framer-motion@latest react@latest)
```
Run the Development Server:

code
Bash
```
npm run dev
```
Open the link shown (usually 

```
http://localhost:5173 
``` 
or 3000) in your browser.

# 🔧 Configuration:

If your backend is running on a port other than 5000, update the API URL:
```
File: src/api/api.js
```

code
JavaScript
```
const API_BASE = "http://localhost:5000/api";
```

# 🌟 Key Features Implementation:

PDF Export: Uses jsPDF to render text and add automatic page breaks.

Voice: Uses window.speechSynthesis (Browser Native) to avoid API costs.

Animations: Uses framer-motion for page transitions (AnimatePresence).

Images: Fetches directly from Pollinations.ai using <img> tags to reduce backend load.

# 🖌️ Styling

Styles are handled via Tailwind CSS.

Main CSS: src/index.css

Theme Config: tailwind.config.js

# Image Overview:

1.Hero Section:
```
![alt text](image.png)
```
2.Personal details:
```
![alt text](image-1.png)
```
3.AI Generating:
```
![alt text](image-2.png)
```
4.Every Day Helath feature:
```
![alt text](image-3.png)
```
5.Image Grid Section:
```
![alt text](image-4.png)
```
6.Diat Maintance:
```
![alt text](image-5.png)
```
7.Image Grid Section:
```
![alt text](image-6.png)
```
8.Health deatils PDF:
```
![alt text](image-7.png)
```
9.PDF Overview:
```
![alt text](image-8.png);
```
10.Audio Play List:
```
![alt text](image-9.png)
```
# Help:

GitHub Project Link:
```
https://github.com/dhamodharanECE/AI-Fitness-Coach-App.git
```

GitHub Link:
```
https://github.com/dhamodharanECE
```
Email Id:
```
dhamodharansece23@gmail.com
```
