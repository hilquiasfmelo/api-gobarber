import { UserToken } from '../infra/typeorm/entities/UserToken';

interface IUserTokensRepository {
  generateToken(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}

export { IUserTokensRepository };
