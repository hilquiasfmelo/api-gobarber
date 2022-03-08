import { Router } from 'express';
import multer from 'multer';

// Configuração de upload de arquivos
import uploadConfig from '@config/upload';

import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';

import { UsersController } from '../controllers/UsersController';
import { UserAvatarController } from '../controllers/UserAvatarController';

const usersRouter = Router();

// Criação de Users
usersRouter.post('/', new UsersController().create);

// Upload Avatar Users
usersRouter.patch(
  '/avatar',
  ensuredAuthenticated,
  multer(uploadConfig).single('avatar'),
  new UserAvatarController().update,
);

export { usersRouter };
