import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoinChat = (e) => {
    e.preventDefault(); // Prevents page reload/disappearance bug
    
    if (!username.trim() || !roomId.trim()) {
      alert('Please enter both a username and a room ID.');
      return;
    }

    // Save session details for the chat room
    localStorage.setItem('chatUser', username.trim());
    localStorage.setItem('chatRoom', roomId.trim());

    // Navigate to the chat interface
    navigate('/chat');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      margin: 0,
      padding: '20px',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        padding: '40px 32px',
        color: '#ffffff'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#818cf8', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            Community Forum
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            Join a real-time discussion room instantly 💬
          </p>
        </div>

        <form onSubmit={handleJoinChat} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#cbd5e1', marginBottom: '8px' }}>
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. Alice"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                background: '#090d16',
                border: '1px solid #334155',
                borderRadius: '10px',
                padding: '14px 16px',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#cbd5e1', marginBottom: '8px' }}>
              Room ID
            </label>
            <input
              type="text"
              placeholder="e.g. MERN101"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
              style={{
                width: '100%',
                background: '#090d16',
                border: '1px solid #334155',
                borderRadius: '10px',
                padding: '14px 16px',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff',
              fontWeight: '700',
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
              marginTop: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            Join Chat Room 🚀
          </button>
        </form>
      </div>
    </div>
  );
}