import { Router } from 'express';
import multer from 'multer';

// Configuração de upload de arquivos
import uploadConfig from '@config/upload';

import { celebrate, Joi, Segments } from 'celebrate';
import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';

import { UsersController } from '../controllers/UsersController';
import { UserAvatarController } from '../controllers/UserAvatarController';

const usersRouter = Router();

// Criação de Users
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  new UsersController().create,
);

// Upload Avatar Users
usersRouter.patch(
  '/avatar',
  ensuredAuthenticated,
  multer(uploadConfig.multer).single('avatar'),
  new UserAvatarController().update,
);

export { usersRouter };
