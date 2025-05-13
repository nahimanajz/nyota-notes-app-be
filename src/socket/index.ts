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
   

    socket.on('note:sync', async (note: Note) => {
      try {
        io.emit('note:synced', {
          ...note,
          isSynced: true,
          updatedAt: Date.now()
        });
        
      } catch (error) {
        socket.emit('sync:error', {
          message: 'Failed to sync note',
          noteId: note.id
        });
       
      }
    });

    socket.on('disconnect', () => {
      io.emit("sync:disconneded", {message: "websocket disconned"})
    });
  });

  return io;
};