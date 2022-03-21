import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

import { User } from '../infra/typeorm/entities/User';

interface IRequestProps {
  user_id: string;
  avatar_filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatar_filename }: IRequestProps): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatar_filename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };