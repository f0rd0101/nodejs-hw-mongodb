import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import authRoutes from './routers/auth.js';
import cookieParser from 'cookie-parser';
import {auth} from "./middlewares/auth.js";
import path from "node:path";

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = async () => {
  const app = express();

  // Парсинг JSON тела и CORS — должны идти ДО роутов!
  app.use(express.json());
  app.use(cors());


  // Логгер — тоже лучше раньше, чтобы логировал все запросы
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Роуты
  app.use(cookieParser());
  app.use("/avatars", express.static(path.resolve("src/uploads/avatars")));

  app.use('/auth', authRoutes);
  app.use(auth,contactsRouter);


  // Обработчик 404 — когда роут не найден
  app.use(notFoundHandler);

  // Глобальный обработчик ошибок
  app.use(errorHandler);

  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use.`);
    } else {
      console.error('❌ Failed to start server:', err);
    }
    process.exit(1);
  }
};