import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';

// Importe da conexão com DB
import './database';

import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀 Server listening on port ${process.env.SERVER_PORT}`);
});
