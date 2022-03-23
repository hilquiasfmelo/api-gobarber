import { getRepository, Not, Repository } from 'typeorm';

import { IFindAllProvidersDTO } from '@modules/users/dtos/IFindAllProvidersDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { User } from '../entities/User';

interface IRequesProps {
  name: string;
  email: string;
  password: string;
}

class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  public async create({ name, email, password }: IRequesProps): Promise<User> {
    const user = this.usersRepository.create({
      name,
      email,
      password,
    });

    await this.usersRepository.save(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      // Busca todos os providers menos o que está logado
      users = await this.usersRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.usersRepository.find();
    }

    return users;
  }

  public async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}

export { UsersRepository };
