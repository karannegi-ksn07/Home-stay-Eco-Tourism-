# Homestay Eco-Tourism Platform - Backend

Backend API service for the Homestay Eco-Tourism Platform.

The backend handles authentication, homestay management, database operations, Google OAuth integration, and AI-powered travel assistance.

---

# Tech Stack

- Backend: Node.js + Express.js
- Database: MongoDB Atlas
- ODM: Mongoose
- Authentication: JWT + bcrypt + Passport Google OAuth
- Validation: Zod
- AI Integration: Google Gemini API

---

# Project Structure
backend/

├── controllers/
│ ├── authController.js
│ ├── homestayController.js
│ └── aiController.js
│
├── models/
│ ├── userModel.js
│ └── homestayModel.js
│
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ ├── homestayRoutes.js
│ └── aiRoutes.js
│
├── middleware/
│ ├── authMiddleware.js
│ └── errorHandler.js
│
├── config/
│ ├── db.js
│ ├── passport.js
│ └── gemini.js
│
└── server.js


---

# How to Run Project

## Backend Setup

Navigate to backend folder:

```bash
cd backend

# Install dependencies:
npm install

# Create a .env file:
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GEMINI_API_KEY=your_gemini_api_key

# Start backend server:
node server.js

# Server runs on:
http://localhost:5000

# Database Choice

We used MongoDB Atlas with Mongoose ODM.

MongoDB was selected because:

It provides flexible schema design.
It works well with JavaScript-based applications.
It supports scalable document-based data storage.
Mongoose provides schema validation and easy database interaction.

# Authentication & Security

The backend implements:

# JWT Authentication
Secure login system
JWT token generation
Protected API routes
User-based authorization

# Password Security
Passwords are hashed using bcrypt before storing.

# Google OAuth
Integrated Google login using Passport.js.
Existing users are linked through email.

# Validation & Protection
Request validation using Zod.
Rate limiting for authentication routes.
Centralized error handling.

# AI Integration

EcoStay uses Google Gemini API for an AI travel assistant.

# Features:

Searches available homestays from MongoDB.
Uses real database information as context.
Provides Uttarakhand-specific travel recommendations.
Avoids generating unavailable homestay information.

# API Endpoints

# Authentication APIs
POST /api/auth/register

POST /api/auth/login

GET /api/auth/google

# Homestay APIs
GET /api/homestays

GET /api/homestays/:id

POST /api/homestays

PUT /api/homestays/:id

DELETE /api/homestays/:id

GET /api/homestays/search

# Database Schema

The project uses MongoDB collections:

# User Collection

# Fields:

name (String)
email (String)
password (String)
googleId (String)
createdAt (Date)
updatedAt (Date)
Homestay Collection

# Fields:

name (String)
location (String)
price (Number)
description (String)
contact (String)
image (String)
createdBy (User Reference)
createdAt (Date)
updatedAt (Date)

Database schema diagram:
![Database Schema](backend/assets/W5_SchemaDiagram_26100873.png)

# Deployment

# Backend deployed on Render:

https://ecostay-backend-1zgs.onrender.com

# Database hosted on:

MongoDB Atlas

# Current Limitations
Render free tier may spin down after inactivity.
First request after inactivity can take additional time.
MongoDB Atlas free tier has limited resources.

