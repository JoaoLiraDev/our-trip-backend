import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { CreateUserDTO, UserDTO } from './users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositoty: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    return this.repositoty.find();
  }

  async createUser(userDTO: CreateUserDTO): Promise<UserDTO> {
    const createUser = await this.repositoty.save(userDTO);
    return createUser;
  }
}
