import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import noteRoutes from './src/routes/note.routes';
import { setupSocket } from './src/socket';
import sequelize from './src/config/db';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.set('io', io); 

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));
app.use(bodyParser.json());

// Routes
app.use('/api', noteRoutes);

// Sync Sequelize models
sequelize.sync()

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));