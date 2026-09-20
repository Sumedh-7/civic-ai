# CivicAI — AI-Powered Community Problem Solver

> **HACKDAY 1.0 — Tech for a Better Tomorrow**

CivicAI is an AI-powered civic issue reporting platform that helps communities identify, report, and track local civic and environmental problems.

Users can upload an image of an issue, provide a description and location, and let AI analyze the problem. CivicAI identifies the issue, categorizes it, estimates its severity, provides a recommended action, and stores the report for tracking through a centralized dashboard.

## 🚨 Problem

Civic problems such as:

* Garbage accumulation
* Waste management issues
* Pollution
* Local environmental problems
* Infrastructure-related issues

often go unreported or lack structured information.

Traditional reporting can also require users to manually describe and categorize problems.

CivicAI simplifies this process by turning a **photo into a structured, actionable report**.

## 💡 Solution

CivicAI provides an end-to-end workflow:

```text
Upload Image
     ↓
Describe Problem
     ↓
Add Location
     ↓
AI Analysis
     ↓
Issue + Category + Severity + Confidence
     ↓
Recommended Action
     ↓
Submit Report
     ↓
Dashboard + Map
```

## ✨ Key Features

* 📷 **Image-based civic issue reporting**
* 🤖 **AI-powered issue detection**
* 🏷️ Automatic issue categorization
* ⚠️ AI-based severity estimation
* 📊 Confidence score
* 💡 Recommended action
* 📍 GPS-based location capture
* 🗺️ Interactive issue map
* 📈 Centralized reporting dashboard
* ☁️ Cloud-based deployment

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* React Router
* Leaflet
* OpenStreetMap

### Backend

* Python
* FastAPI
* REST APIs

### AI

* Google Gemini 3.6 Flash

### Database

* Supabase
* PostgreSQL

### Deployment

* Vercel — Frontend
* Render — Backend

## 🏗️ Architecture

```text
                ┌──────────────────┐
                │      User        │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ React + Vite     │
                │    Frontend      │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ FastAPI Backend  │
                └───────┬──────────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
     ┌────────────────┐   ┌────────────────┐
     │ Gemini AI      │   │ Supabase       │
     │ Analysis       │   │ PostgreSQL     │
     └────────────────┘   └───────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Dashboard + Map │
                         └─────────────────┘
```

## 👥 Target Users

* Citizens
* Students and local communities
* NGOs and environmental organizations
* Residential communities
* Educational institutions
* Municipal and civic organizations

## 🚀 Live Demo

**Live Demo:**
https://civic-ai-omega-two.vercel.app/

**Backend:**
https://civic-ai-backend-2mmb.onrender.com

## 📂 Project Structure

```text
civic-ai/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── services/
│       ├── ai.py
│       └── db.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Report.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sumedh-7/civic-ai.git
cd civic-ai
```

### 2. Backend Setup

```bash
cd backend
python -m venv .venv
```

Activate the environment:

**Windows:**

```powershell
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

Start the backend:

```bash
uvicorn app:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## 🔐 Environment Variables

The following environment variables are required:

| Variable         | Purpose                  |
| ---------------- | ------------------------ |
| `GEMINI_API_KEY` | Gemini AI access         |
| `SUPABASE_URL`   | Supabase project URL     |
| `SUPABASE_KEY`   | Supabase database access |

**Never commit `.env` or API keys to GitHub.**

## 📊 Current MVP Workflow

The current MVP supports:

1. Uploading an image
2. Adding a problem description
3. Getting GPS coordinates
4. AI-powered image analysis
5. Issue classification
6. Severity estimation
7. Confidence scoring
8. Recommended action generation
9. Saving reports to Supabase
10. Viewing reports on the dashboard
11. Displaying location-based reports on a map

## 🔮 Future Scope

With additional development, CivicAI could include:

* Automated routing to relevant departments
* Issue resolution tracking
* Duplicate report detection
* Community verification
* Advanced heatmaps
* Real-time notifications
* Multi-language support
* Municipal system integrations
* AI-assisted prioritization
* Advanced civic analytics

## 🌍 Vision

> **Turn community observations into actionable civic intelligence.**

CivicAI aims to make civic reporting simpler, smarter, and more data-driven — helping communities move from **identifying problems to taking action**.

## 👨‍💻 Project

**CivicAI**
Built for **HACKDAY 1.0 — Tech for a Better Tomorrow**

**GitHub:**
https://github.com/Sumedh-7/civic-ai

**Live Demo:**
https://civic-ai-omega-two.vercel.app/
