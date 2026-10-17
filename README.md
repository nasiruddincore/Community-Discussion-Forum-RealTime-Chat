# 💬 Community Discussion Forum with Real-Time Chat

A full-stack platform combining asynchronous forum threads with synchronous live chat rooms.

## 🚀 Overview & Features
* **RESTful Forum:** Create, read, and engage with community discussion threads.
* **Real-Time WebSockets:** Instantly broadcast messages in isolated chat rooms using Socket.IO.
* **Secure Authentication:** JWT-based user login and hashed passwords via bcrypt.
* **Responsive UI:** Built with React and styled using Tailwind CSS.

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS, socket.io-client
* **Backend:** Node.js, Express.js, Socket.IO
* **Database:** MongoDB Atlas, Mongoose

## ⚙️ How to Run Locally
1. Clone the repository.
2. Navigate to `/server` and run `npm install`.
3. Create a `/server/.env` file with `PORT=5000`, `MONGO_URI=your_db_uri`, and `JWT_SECRET=secret`.
4. Run `npm run dev` to start the backend.
5. Navigate to `/client`, run `npm install`, then `npm run dev` to start the frontend.

## 👤 Author
Developed as a Full-Stack Engineering Proof-of-Work project.