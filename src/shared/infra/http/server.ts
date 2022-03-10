import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

// Importe da conexão com DB
import '@shared/infra/typeorm';

// Importe das Injeções de Dependências
import '@shared/container';

import uploadConfig from '@config/upload';

import { routes } from '@shared/infra/http/routes';
import { ServerError } from '@shared/errors/ServerError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(ServerError);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀 Server Listening on Port ${process.env.SERVER_PORT}`);
});

export { app };
