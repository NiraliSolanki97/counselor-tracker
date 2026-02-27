Counselor Performance Tracker

A full-stack web application built to monitor, evaluate, and manage counselor performance metrics in a structured and data-driven manner.
The system enables administrators to track productivity, performance indicators, and operational efficiency through a centralized dashboard.

Overview

The Counselor Performance Tracker is designed to solve a common operational challenge in education and consultancy environments — measuring counselor productivity and tracking performance data consistently.

This application provides:

Structured performance tracking

Centralized data management

API-driven architecture

Scalable frontend-backend separation

Cloud deployment readiness

*System Architecture

Frontend and backend are decoupled and deployed independently.

Client (Browser)
        ↓
Frontend (React + Vite)
        ↓
Backend API (Node.js + Express)
        ↓
Database (LowDB / SQLite / JSON-based storage)

*Tech Stack
-Frontend

React (Vite)

JavaScript (ES6+)

Fetch API / Axios

Modern CSS

-Backend

Node.js

Express.js

CORS

dotenv

Lightweight database (LowDB / SQLite)

*Deployment

Frontend: Netlify

Backend: Render


*Project StructureCounselor-Performance-Tracker/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md

*CORE FEATURES

Add counselor records

Track daily and weekly performance metrics

Retrieve and display performance data

RESTful API architecture

Modular backend routing

Production-ready build configuration

Cloud deployment compatible

*API Structure
Base URL (Development)- http://localhost:3000

*Local Development Setup
-Clone Repository
git clone https://github.com/your-username/counselor-performance-tracker.git
cd counselor-performance-tracker

 -Backend Setup
 cd backend
npm install
npm start

-server runs at -http://localhost:3000
-Environment Variables (backend/.env) - PORT =3000

*Frontend Setup
Open a new terminalcd frontend
npm install
npm run dev
-applications runs at -http://localhost:5173

*Production Build (Frontend)

Inside frontend:

npm run build
This generates:

dist/

*Deployment Configuration
Netlify (Frontend)

Base Directory: frontend

Build Command: npm run build

Publish Directory: dist

*Render (Backend)

Root Directory: backend

Build Command: npm install

Start Command: node server.js

*Production URLs

Frontend:

https://your-site-name.netlify.app

Backend:

https://your-backend-name.onrender.com

*Performance & Scalability Considerations

Modular routing structure

Separated client/server architecture

Environment-based configuration

API-first design

Ready for authentication layer integration

Can be extended to support analytics dashboards

*Future Enhancements

JWT Authentication

Role-based access control

Data visualization dashboards

Export reports (CSV / PDF)

Admin control panel

Cloud database integration (MongoDB Atlas / PostgreSQL)

*Development Workflow

Develop features locally

Push to GitHub

Automatic Netlify frontend deployment

Automatic Render backend deployment

Production verification

*Author
Nirali Solanki
Computer Science Engineer 
