import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';
import { IHashProvider } from '../provider/HashProvider/models/IHashProvider';

interface IRequestProps {
  token: string;
  new_password: string;
}

@injectable()
class ResetPasswordUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ token, new_password }: IRequestProps): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exist.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    /**
     * Verifica se o agendamendo já passou de 2hrs.
     */
    const tokenCreatedAt = userToken.created_at;

    // Adiciona 2hrs a mais a partir da data de criação do Token de Usuário
    const compareDate = addHours(tokenCreatedAt, 2);

    // Se a data/hora atual for maior do que o [compareDate], já passou de 2hrs
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }
    /**
     *  Fim da verificação de horário passado do agendamendo.
     */

    const newPasswordHash = await this.hashProvider.generateHash(new_password);

    user.password = newPasswordHash;

    await this.usersRepository.save(user);
  }
}

export { ResetPasswordUserService };
