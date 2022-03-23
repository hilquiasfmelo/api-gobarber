import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { AppError } from '@shared/errors/AppError';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<User[]> {
    const user = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    if (user.length <= 0) {
      throw new AppError('There were no discoverers providers.', 404);
    }

    return user;
  }
}

export { ListProvidersService };
