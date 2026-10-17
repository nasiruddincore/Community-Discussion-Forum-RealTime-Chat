const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`New WebSocket Connection: ${socket.id}`);

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    socket.on('send_message', (messageData) => {
      // Broadcast to everyone in the room EXCEPT the sender
      socket.to(messageData.room).emit('receive_message', messageData);
    });

    socket.on('typing', (data) => {
      socket.to(data.room).emit('display_typing', data.username);
    });

    socket.on('disconnect', () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });
};

module.exports = chatSocket;