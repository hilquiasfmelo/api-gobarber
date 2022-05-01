import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { User } from '../infra/typeorm/entities/User';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../provider/HashProvider/models/IHashProvider';

interface IRequestProps {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ name, email, password }: IRequestProps): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError(`Email address already exists.`);
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    // Zera os dados do cache assim que um novo usuário é criado.
    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export { CreateUsersService };
