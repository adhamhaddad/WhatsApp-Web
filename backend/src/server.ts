import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import os from 'os';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import configs from './configs';
import router from './routes';

// Express App
const app: Application = express();
const port: number = configs.port || 8000;

const ip =
  os.networkInterfaces()['wlan0']?.[0].address ||
  os.networkInterfaces()['eth0']?.[0].address;

const corsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'X-Refresh-Token',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods'
  ],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  origin: true,
  credentials: true
};

const GROUPS = path.join(__dirname, '..', 'uploads', 'groups-pictures');
const PROFILE = path.join(__dirname, '..', 'uploads', 'profile-pictures');

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan('common'));
app.use(express.json());
app.use('/uploads/groups-pictures', express.static(GROUPS));
app.use('/uploads/profile-pictures', express.static(PROFILE));
app.use(express.urlencoded({ extended: false }));
app.use(router);

// Express Server
const server = http.createServer(app).listen(port, () => {
  console.log(`Backend server is listening on http://${ip}:${configs.port}`);
  console.log('Press CTRL+C to stop the server.');
});

export const io = new Server(server, { cors: corsOptions });

io.on('connection', (socket) => {
  console.log('User connected');
  io.on('disconnect', () => {
    console.log('User disconnected');
  });
});

export default app;
