import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './users.service';
import { Response } from 'express';
import { CreateUserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async findAllUsers(@Res() response: Response) {
    return response.status(200).json(await this.usersService.findAllUsers());
  }

  @Post()
  async createUser(@Res() response: Response, @Body() dto: CreateUserDTO) {
    return response.status(201).json(await this.usersService.createUser(dto));
  }
}
