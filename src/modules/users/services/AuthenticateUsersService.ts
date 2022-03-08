import { injectable, inject } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../repositories/IUsersRepository';

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

@injectable()
class AuthenticateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequestProps): Promise<IReponseProps> {
    const user = await this.usersRepository.findByEmail(email);

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
