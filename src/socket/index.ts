import { Server } from 'socket.io';
import http from 'http';

export const setupSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => console.log('A user disconnected'));
  });

  return io;
};