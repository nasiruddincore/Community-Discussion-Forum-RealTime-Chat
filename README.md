# 💬 Community Discussion Forum with Real-Time Chat

![React](https://img.shields.io/badge/Frontend-React%20%2F%20Vite-blue)
![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-cyan)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-green)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-orange)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## 📌 Project Overview
A full-stack web application combining community forum discussions with instant, room-based real-time chat capabilities. Users can select usernames, join specific room IDs, and broadcast messages instantly to peers across separate browser sessions using WebSockets.

## ⚠️ Problem Statement & Solution
Traditional web forums require continuous page reloading to check for new discussion replies, hindering fast-paced collaboration. This project solves latency and communication bottlenecks by pairing a persistent MongoDB data layer with a real-time event-driven Socket.IO server, enabling instantaneous message delivery and live user presence notifications.

## ⚙️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS, React Router, Socket.IO Client
* **Backend:** Node.js, Express.js, Socket.IO, Mongoose
* **Database:** Local MongoDB Community Server (`mongodb://127.0.0.1:27017/forum`)

## 🏛️ Sibling Architecture & Workflow
```text
[ Client (Vite :5173) ] <──> [ Express & Socket.IO Server (:5000) ] <──> [ Local MongoDB (:27017) ]

📂 Folder Structure
Plaintext

Community-Discussion-Forum-RealTime-Chat/
├── client/                  # React & Vite frontend application
│   ├── src/
│   │   ├── pages/          # Login & Chat room views
│   │   ├── sockets/        # Socket.IO client configuration
│   │   └── App.jsx         # Main routing & state controller
│   └── package.json
├── server/                  # Node.js Express & Socket.IO backend
│   ├── server.js           # Main server entry & socket listeners
│   └── package.json
└── README.md

🚀 Setup & Execution Instructions (PowerShell)

To run this full-stack application locally, you must open two separate PowerShell windows to keep both the backend and frontend active simultaneously.
Step 1: Start the Backend Server (Terminal 1)

Open your first PowerShell window, navigate to the server folder, and start Nodemon:
PowerShell

cd "F:\IIT DELHI\Fullstack development Projects\Community-Discussion-Forum-RealTime-Chat\server"
npm run dev

(Verification: Ensure the terminal outputs Server running on port 5000 and MongoDB Connected)
Step 2: Start the Frontend Client (Terminal 2)

Open a brand-new, second PowerShell window, navigate to the client folder, and start the Vite development server:
PowerShell

cd "F:\IIT DELHI\Fullstack development Projects\Community-Discussion-Forum-RealTime-Chat\client"
npm run dev

(Verification: Look for ➜ Local: http://localhost:5173/. Click or open this link in your browser).
✨ Key Features

    Instant Room Joining: Dynamic routing into isolated chat rooms using unique Room IDs.

    Real-Time Broadcasting: Live message delivery across multiple client sessions without page refreshes.

    System Notifications: Automated alerts when participants join or leave active rooms.

    Persistent Connection Security: Custom CORS configuration and credential handling for seamless local communication.

👤 Author

Developed as a full-stack MERN portfolio project showcasing real-time web architecture and socket programming.
