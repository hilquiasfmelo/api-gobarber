import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';

import uploadConfig from './config/upload';

// Importe da conexão com DB
import './database';

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀 Server Listening on Port ${process.env.SERVER_PORT}`);
});

export { app };
