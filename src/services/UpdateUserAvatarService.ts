import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import { User } from '../models/User';

import uploadConfig from '../config/upload';

interface IRequestProps {
  user_id: string;
  avatar_filename: string;
}

class UpdateUserAvatarService {
  async execute({ user_id, avatar_filename }: IRequestProps): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      // Une o caminho do arquivo com o próprio arquivo da imagem
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Verifica se já existe um avatar para o usuário
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        // Remove o avatar do usuário para outro avatar ser adicionado
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatar_filename;

    await usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };
