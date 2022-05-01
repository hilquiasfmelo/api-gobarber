import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import { AppError } from '@shared/errors/AppError';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(user_id: string): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      console.debug('A query no banco foi feita!');

      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    if (users.length <= 0) {
      throw new AppError('There were no discoverers providers.', 404);
    }

    return users;
  }
}

export { ListProvidersService };
