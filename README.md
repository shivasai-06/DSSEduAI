# DSSEduAI

**Full name:** DSSEduAI — Personalized Learning & Skill Gap Agent  
**AI Mentor:** EduAI Mentor  

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://dsseduai.vercel.app/)

## Project Overview
DSSEduAI is an intelligent, personalized learning platform that dynamically assesses student skills, identifies knowledge gaps, and provides tailored learning roadmaps. It is designed to bridge the gap between a student's current capabilities and their target career goals through an interactive, AI-driven experience.

### Problem Statement
Students often struggle to map their current skills to industry requirements. Without personalized guidance, they may spend time learning irrelevant topics while missing critical foundational knowledge required for their target careers.

### Solution
DSSEduAI solves this by providing a targeted assessment mechanism, skill gap analysis, and a personalized learning roadmap. The integrated **EduAI Mentor** provides real-time, context-aware guidance to help students overcome learning hurdles and stay on track.

## Key Features

### AI Mentor (EduAI Mentor)
*   An intelligent chat interface powered by Google Gemini.
*   Context-aware responses: The AI knows the student's target career, assessed skills, and progress.
*   Provides code explanations, study planning, and technical concept breakdowns.

### Skill Gap Analysis
*   Evaluates current skill levels against the required proficiency for a target career.
*   Highlights high-priority areas that need improvement.

### Personalized Learning
*   Generates a structured roadmap of courses and topics based on identified skill gaps.
*   Tracks progress as students complete learning modules.

## Technology Stack

**Frontend:**
*   React 18
*   TypeScript
*   Vite
*   Tailwind CSS
*   Lucide React (Icons)

**Backend:**
*   FastAPI (Python)
*   Google GenAI SDK (Gemini)
*   Pydantic for Data Validation

**Database & Authentication:**
*   Supabase (PostgreSQL, Auth)

## System Architecture
The application uses a decoupled client-server architecture:
1.  **Frontend (Vercel):** A React SPA that handles UI state, student dashboard, assessments, and direct communication with Supabase for data fetching.
2.  **Backend (Render):** A FastAPI service that handles secure communication with the Google Gemini API, injecting user context from Supabase into the AI prompts.
3.  **Database (Supabase):** Stores user profiles, skill matrices, course progress, and assessment scores.

## Project Structure
```
DSSEduAI/
├── frontend/             # React/Vite frontend application
│   ├── src/              # React components, pages, and services
│   ├── .env.example      # Environment variable template
│   └── package.json      # Node dependencies
├── backend/              # FastAPI backend application
│   ├── app/              # Routes, services, schemas, and config
│   ├── .env.example      # Environment variable template
│   └── requirements.txt  # Python dependencies
├── database/             # Database schemas and seed scripts
│   └── schema.sql        # Supabase PostgreSQL schema
└── README.md             # Project documentation
```

## Prerequisites
*   Node.js (v18 or higher)
*   Python (3.9 or higher)
*   A Supabase project (for database and auth)
*   A Google Gemini API key

## Environment Variables

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend/` directory using `.env.example`:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_API_BASE_URL=http://127.0.0.1:8001
```

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory using `.env.example`:
```env
PROJECT_NAME="DSSEduAI Backend"
VERSION="1.0.0"
API_V1_STR="/api/v1"
BACKEND_CORS_ORIGINS='["http://localhost:5179", "http://127.0.0.1:5179"]'
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here
```

## Local Installation

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## How to Run the Complete Application

1. **Start the Backend:**
   In your activated Python virtual environment inside the `backend/` directory:
   ```bash
   uvicorn app.main:app --reload --port 8001
   ```
   The API will be available at `http://127.0.0.1:8001`.

2. **Start the Frontend:**
   In a new terminal window inside the `frontend/` directory:
   ```bash
   npm run dev -- --port 5179
   ```
   The application will be available at `http://localhost:5179`.

## Production / Live Demo
*   **Live Application:** [https://dsseduai.vercel.app/](https://dsseduai.vercel.app/)
*   **GitHub Repository:** [https://github.com/shivasai-06/DSSEduAI](https://github.com/shivasai-06/DSSEduAI)

## API Overview
The backend exposes the following primary AI endpoint:
*   `POST /api/v1/gemini/chat`
    *   **Payload:** `{"message": "string"}`
    *   **Headers:** `Authorization: Bearer <Supabase JWT>` (Optional, but required for context-aware responses)
    *   **Description:** Forwards the user's message and their Supabase context to the EduAI Mentor (Gemini).

## Security Notes
*   **API Keys:** The Gemini API key is stored securely on the backend. The frontend NEVER communicates with Google GenAI directly.
*   **CORS:** The backend is configured to only accept requests from the verified Vercel production domains and local development ports.
*   **Database:** Supabase Row Level Security (RLS) ensures users can only access their own profile and progress data.

## Troubleshooting
*   **EduAI Mentor is temporarily unavailable:** Ensure your backend `.env` contains a valid `GEMINI_API_KEY`. The backend will gracefully fail and return a friendly error if the key is missing or invalid.
*   **CORS Errors on Localhost:** Ensure the `BACKEND_CORS_ORIGINS` in your backend `.env` matches the port where your Vite frontend is running (default is 5179).
*   **Supabase Connection Issues:** Verify that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the frontend `.env` match your Supabase project settings.

## Future Enhancements
*   Implementation of real-time voice chat with the AI Mentor.
*   Expanded career paths and dynamic assessment generation.
*   Gamification and peer-to-peer learning groups.

## License
MIT License. See `LICENSE` for details.
