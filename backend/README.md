#  Homestay Eco-Tourism Platform

## Tech Stack
- Frontend: Next.js (React)
- Backend: Node.js + Express

---

##  How to run project

### Backend
```bash
cd backend
npm install
node server.js

## Database Choice

We used MongoDB Atlas with Mongoose ODM.

MongoDB was chosen because it supports flexible schema design and is well-suited for scalable web applications.

## Setup Instructions

1. Install dependencies:
npm install

2. Create .env file:
PORT=5000
MONGO_URI=your_connection_string

3. Start server:
node server.js

## API Endpoints

GET /api/homestays  
GET /api/homestays/:id  
POST /api/homestays  
PUT /api/homestays/:id  
DELETE /api/homestays/:id  
GET /api/homestays/search


## Database Schema

The project uses a single MongoDB collection: Homestay.

Each document contains:

- name (String)
- location (String)
- price (Number)
- createdAt (Date)
- updatedAt (Date)

![Database Schema](backend/assets/W5_SchemaDiagram_26100873.png)