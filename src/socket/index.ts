import { Server } from 'socket.io';
import http from 'http';
import { Note } from '../types/note';

export const setupSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('note:sync', async (note: Note) => {
      try {
        io.emit('note:synced', {
          ...note,
          isSynced: true,
          updatedAt: Date.now()
        });
        console.log('Note synced:', note.id);
      } catch (error) {
        socket.emit('sync:error', {
          message: 'Failed to sync note',
          noteId: note.id
        });
        console.error('Sync error:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};