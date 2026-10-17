import React, { useState, useEffect, useRef } from 'react';
import { socket } from './sockets/socketConfig';

export default function App() {
  const [isJoined, setIsJoined] = useState(false);
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Listen for incoming chat messages from the server
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Listen for user join/leave notifications
    socket.on('user_notification', (notification) => {
      setMessages((prev) => [...prev, { system: true, text: notification }]);
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_notification');
    };
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim() || !roomId.trim()) {
      alert('Please enter both a username and a room ID.');
      return;
    }

    // Connect socket and join the specified room
    socket.connect();
    socket.emit('join_room', { username: username.trim(), roomId: roomId.trim() });
    setIsJoined(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageData = {
      roomId: roomId.trim(),
      sender: username.trim(),
      text: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    socket.emit('send_message', messageData);
    setMessages((prev) => [...prev, { ...messageData, self: true }]);
    setMessage('');
  };

  const handleLeaveRoom = () => {
    socket.disconnect();
    setIsJoined(false);
    setMessages([]);
    setUsername('');
    setRoomId('');
  };

  // --- RENDER 1: LOGIN / JOIN FORM ---
  if (!isJoined) {
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
          background: 'rgba(15, 23, 42, 0.95)',
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

          <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

  // --- RENDER 2: LIVE CHAT ROOM INTERFACE ---
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      background: '#0f172a',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      margin: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      color: '#ffffff',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        background: '#1e1b4b',
        borderBottom: '1px solid #334155',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#818cf8' }}>Room: {roomId}</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Logged in as: <strong>{username}</strong></p>
        </div>
        <button
          onClick={handleLeaveRoom}
          style={{
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Leave Room
        </button>
      </div>

      {/* Messages Box */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: '#090d16'
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#64748b', marginTop: '40px' }}>
            <p>No messages yet. Start the conversation below! 🚀</p>
          </div>
        )}

        {messages.map((msg, index) => {
          if (msg.system) {
            return (
              <div key={index} style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', margin: '8px 0' }}>
                <em>{msg.text}</em>
              </div>
            );
          }

          const isSelf = msg.self || msg.sender === username;
          return (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isSelf ? 'flex-end' : 'flex-start'
            }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '2px', padding: '0 4px' }}>
                {isSelf ? 'You' : msg.sender} {msg.time && `• ${msg.time}`}
              </span>
              <div style={{
                maxWidth: '65%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: isSelf ? '#6366f1' : '#1e293b',
                color: '#ffffff',
                fontSize: '15px',
                wordBreak: 'break-word',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} style={{
        padding: '16px 24px',
        background: '#1e1b4b',
        borderTop: '1px solid #334155',
        display: 'flex',
        gap: '12px'
      }}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            flex: 1,
            background: '#090d16',
            border: '1px solid #334155',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#ffffff',
            fontSize: '15px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            background: '#6366f1',
            color: '#ffffff',
            border: 'none',
            padding: '0 24px',
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '15px',
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
          }}
        >
          Send 📤
        </button>
      </form>
    </div>
  );
}