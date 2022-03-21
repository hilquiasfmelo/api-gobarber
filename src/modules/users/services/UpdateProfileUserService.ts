import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { User } from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../provider/HashProvider/models/IHashProvider';

interface IRequestProps {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  user_id: string;
}

@injectable()
class UpdateProfileUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    user_id,
    old_password,
    password,
  }: IRequestProps): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    // Não pode alterar o email de um outro usuário.
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    Object.assign(user, { name, email });

    // Verifica se a senha antiga foi inserida.
    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      // Verifica se a senha antiga bate com a cadastrada no Banco.
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      // Altera a senha do usuário para um nova
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export { UpdateProfileUserService };
