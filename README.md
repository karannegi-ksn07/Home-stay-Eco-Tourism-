# EcoStay — Homestay & Eco-Tourism Platform

EcoStay is a full-stack homestay and eco-tourism platform focused on promoting authentic stays across Uttarakhand. The platform allows users to explore homestays, create their own listings, manage properties, authenticate securely, and interact with an AI-powered travel assistant.

Built as an internship project at TBI GEU.

---

# Live Deployment

Frontend:
https://home-stay-eco-tourism.vercel.app

Backend API:
https://ecostay-backend-1zgs.onrender.com

---

# Features

## User Authentication
- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Google OAuth login integration
- Protected routes and user sessions

## Homestay Management
- Browse Uttarakhand homestays
- View homestay details
- Create new listings
- Update existing listings
- Delete owned listings
- User-specific dashboard

## AI Travel Assistant
- Gemini-powered chatbot
- Provides Uttarakhand travel recommendations
- Uses real homestay database information
- Prevents unsupported recommendations using context-based prompting

## UI & User Experience
- Responsive design
- Light/Dark theme support
- Custom reusable components
- Loading states
- Error handling pages
- Mobile-friendly interface

---

# Tech Stack

## Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- Context API
- React Markdown

## Backend

- Node.js
- Express.js
- Mongoose ODM

## Database

- MongoDB Atlas

## Authentication

- JWT
- bcrypt
- Passport Google OAuth

## Artificial Intelligence

- Google Gemini API

---

# Project Architecture

EcoStay

├── app/
│ ├── pages and frontend routes
│
├── components/
│ ├── reusable UI components
│ ├── authentication context
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── config/
│
└── package.json


---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/karannegi-ksn07/Home-stay-Eco-Tourism-


---

# Frontend Setup

## Install dependencies:

npm install

## Run frontend:
npm run dev

## Backend Setup
cd backend

## Install dependencies:
npm install

## Start Backend 
npm start

## Database 
## MongoDB Atlas is used with Mongoose ODM. 

Homestay Schema:

name
location
price
description
contact
image
createdBy
createdAt
updatedAt




## Deployment 

## Frontend:
Deployed using Vercel

## Backend:
Deployed using Render

## Database:
Hosted using MongoDB Atlas

Production environment variables are configured through deployment dashboards.

# Free Tier Limitations
Render free instances may sleep after inactivity.
First backend request after inactivity may take additional time.
MongoDB Atlas free tier has limited storage and resources.

# Future Improvements
Real booking and payment system
User reviews and ratings
Image upload storage
Advanced recommendation system
Admin dashboard