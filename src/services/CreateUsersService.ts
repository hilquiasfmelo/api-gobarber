import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import { User } from '../models/User';

interface IRequestProps {
  name: string;
  email: string;
  password: string;
}

class CreateUsersService {
  async execute({ name, email, password }: IRequestProps): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error(`Email address already exists`);
    }

    const passwordHash = await hash(password, 4);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUsersService };
