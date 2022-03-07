import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { User } from '../models/User';

import { AppError } from '../errors/AppError';

interface IRequestProps {
  email: string;
  password: string;
}

interface IReponseProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

class AuthenticateUsersService {
  async execute({ email, password }: IRequestProps): Promise<IReponseProps> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passworMatched = await compare(password, user.password);

    if (!passworMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, String(process.env.JWT_SECRET), {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    } as IReponseProps;
  }
}

export { AuthenticateUsersService };
