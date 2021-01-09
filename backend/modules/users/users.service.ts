import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterRequest } from '../auth/dto/register-user.dto';
import { User } from './entities/user.entity';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}
  public async createUserFromRequest(request: RegisterRequest): Promise<User> {
    const { username, password } = request;

    const existingFromUsername = await this.usersRepository.findOne({
      where: {
        userName: request.username,
      },
    });

    if (existingFromUsername) {
      throw new ConflictException('Username already in use');
    }

    return this.usersRepository.createUser(username, password);
  }

  public async findForId(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findForUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        userName: username,
      },
    });
  }
}
