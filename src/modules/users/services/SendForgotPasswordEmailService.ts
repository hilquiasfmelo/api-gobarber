import { inject, injectable } from 'tsyringe';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';

import { AppError } from '@shared/errors/AppError';

import { IUserTokensRepository } from '../repositories/IUserTokensRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequestProps {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequestProps): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    // Realiza a geração de um token que referência um usuário.
    const { token } = await this.userTokensRepository.generateToken(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`,
    );
  }
}

export { SendForgotPasswordEmailService };
