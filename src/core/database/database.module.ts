import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      sid: 'ORCL',
      synchronize: true,
      logging: true,
      migrations: [__dirname + 'migration/scripts/*{.js,.ts}'],
      entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    }),
  ],
})
export class DataBaseModule {}
