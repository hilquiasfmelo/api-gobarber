import { instanceToInstance } from 'class-transformer';
import { Router } from 'express';
import multer from 'multer';

import { CreateUsersService } from '../services/CreateUsersService';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';

// Configuração de upload de arquivos
import uploadConfig from '../config/upload';

const usersRouter = Router();

// Criação de Users
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUsersService = new CreateUsersService();

  const user = await createUsersService.execute({ name, email, password });

  return response.status(201).json(instanceToInstance(user));
});

// Upload Avatar Users
usersRouter.patch(
  '/avatar',
  ensuredAuthenticated,
  multer(uploadConfig).single('avatar'),
  async (request, response) => {
    const { user_id } = request.user;
    const filename = request.file?.filename;

    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id,
      avatar_filename: String(filename),
    });

    return response.status(200).json(instanceToInstance(user));
  },
);

export { usersRouter };
