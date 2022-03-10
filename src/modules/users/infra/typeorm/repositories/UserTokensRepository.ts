import { getRepository, Repository } from 'typeorm';

import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { UserToken } from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private userTokensRepository: Repository<UserToken>;

  constructor() {
    this.userTokensRepository = getRepository(UserToken);
  }

  public async generateToken(user_id: string): Promise<UserToken> {
    const userToken = this.userTokensRepository.create({
      user_id,
    });

    await this.userTokensRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokensRepository.findOne({
      where: { token },
    });

    return userToken;
  }
}

export { UserTokensRepository };
