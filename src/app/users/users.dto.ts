import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome é um campo obrigatório' })
  name: string;

  @IsString()
  @IsEmail({}, { message: 'O formato do email é inválido' })
  @IsNotEmpty({ message: 'E-mail é um campo obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é um campo obrigatório' })
  @MinLength(6, { message: 'A senha deve conter no minimo 6 digitos' })
  @MaxLength(255, { message: 'A senha deve conter no máximo 255 digitos' })
  password: string;
}

export class UserDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
