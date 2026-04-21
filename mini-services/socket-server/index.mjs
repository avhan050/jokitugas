import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*', // Di production, ganti dengan domain Anda
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join room berdasarkan user ID untuk notifikasi spesifik
  socket.on('join-user', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`Socket ${socket.id} joined user room: user-${userId}`);
  });

  // Relay event global (misal: tugas baru, marketplace update)
  socket.on('data-updated', (data) => {
    console.log('Data update event received:', data);
    // Broadcast ke SEMUA client yang terhubung
    io.emit('refresh-required', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = Number(process.env.SOCKET_PORT || process.env.INTERNAL_SOCKET_PORT || 3003);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
