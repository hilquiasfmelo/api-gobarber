import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

import uploadConfig from './config/upload';

// Importe da conexão com DB
import './database';

import { routes } from './routes';

import { ServerError } from './errors/ServerError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(ServerError);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀 Server Listening on Port ${process.env.SERVER_PORT}`);
});

export { app };
