import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { Response } from 'express';
import { CreateUserDTO } from './users.dto';
import { Public } from '../auth/auth.decorator';

@Controller('users')
@UseGuards()
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async findAllUsers(@Res() response: Response) {
    return response.status(200).json(await this.usersService.findAllUsers());
  }

  @Public()
  @Post()
  async createUser(@Res() response: Response, @Body() dto: CreateUserDTO) {
    return response.status(201).json(await this.usersService.createUser(dto));
  }
}
