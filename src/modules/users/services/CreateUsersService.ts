import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import { AppError } from '@shared/errors/AppError';

import { User } from '../infra/typeorm/entities/User';

import { IUsersRepository } from '../repositories/IUsersRepository';

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
  ) {}

  async execute({ name, email, password }: IRequestProps): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError(`Email address already exists.`);
    }

    const passwordHash = await hash(password, 4);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUsersService };
