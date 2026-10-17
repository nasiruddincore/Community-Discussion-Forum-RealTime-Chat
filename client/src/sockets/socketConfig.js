import { io } from 'socket.io-client';

// Explicitly point to your Express backend port
const BACKEND_URL = 'http://localhost:5000';

export const socket = io(BACKEND_URL, {
  autoConnect: false,
  withCredentials: true
});