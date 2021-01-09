import { hash } from 'bcrypt';

import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async getByName(userName: string): Promise<User | undefined> {
    return await this.findOne(
      { userName },
      { relations: ['roles', 'student', 'teacher'] },
    );
  }

  public async getById(id: string): Promise<User | undefined> {
    return await this.findOne(id, {
      relations: ['roles', 'student', 'teacher'],
    });
  }

  public async createUser(username: string, password: string): Promise<User> {
    const user = new User();

    user.userName = username;
    user.password = await hash(password, 10);

    return this.save(user);
  }
}
