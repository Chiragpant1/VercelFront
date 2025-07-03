Documentation
1. Setup Instructions

Prerequisites
*Node.js (v18+ recommended)
*npm
*MongoDB (local or Atlas)

Installation
*Backend (/server)
cd server
npm install

Frontend (/client)
cd client
npm install
Running Locally

Start MongoDB
Make sure MongoDB is running locally or update MONGO_URI in .env to your MongoDB Atlas URI.

Start Backend
cd server
npm start
The backend will run on http://localhost:5000 by default.

Start Frontend
cd client
npm run dev
The frontend will run on http://localhost:5173 by default.

2. API Documentation
 
REST Endpoints

Room Management

*POST /api/rooms/join
Join or create a room.
Body: { "roomId": "ROOM_CODE" }
Response: { success: true, roomId: "ROOM_CODE" }

*GET /api/rooms/:roomId
Get room info.
Response: { success: true, room: { ...roomData } }

Socket Events

Client to Server

*join-room
{ roomId }
Joins the specified room. If the room doesn't exist, it is created.

*draw
{ roomId, data }
Broadcasts drawing data to all users in the room.

*clear
roomId
Clears the whiteboard for all users in the room.

Server to Client

*draw
data
Receives drawing data from other users.

*clear
Clears the whiteboard.

3. Architecture Overview

High-Level Design

*Frontend (React + Vite):
Handles UI, drawing canvas, room join, and communicates with backend via REST and Socket.io.

*Backend (Express + Socket.io + MongoDB):

REST API for room management.
Socket.io for real-time drawing and room events.
MongoDB stores room data and drawing history.

*Data Flow:

User joins a room (REST + Socket.io).
Drawing actions are sent via Socket.io and persisted in MongoDB.
New users receive existing drawing data when joining a room.

4. Deployment Guide (Vercel)

Backend Deployment

Push /server to a GitHub repository.
On Vercel:
Create a new project, import your repo, and select /server as the root.
Set the build output to server.js (Vercel auto-detects with your vercel.json).
Add environment variables (MONGO_URI, PORT).
Deploy.

Frontend Deployment

Push /client to a GitHub repository.
On Vercel:
Create a new project, import your repo, and select /client as the root.
Set the build command to npm run build and output directory to dist.
Set VITE_SERVER_URL in Vercel environment variables to your deployed backend URL (e.g., https://your-backend.vercel.app).
Deploy.

Notes
Ensure CORS is enabled on the backend for your frontend domain.
Update VITE_SERVER_URL in your frontend .env or Vercel dashboard to match your backend deployment URL.

