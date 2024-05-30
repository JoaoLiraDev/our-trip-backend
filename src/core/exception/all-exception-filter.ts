import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { QueryFailedError } from 'typeorm';

import { PostgresError } from '@core/database/database.definitions';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private logger: Logger = new Logger('Exceptions');

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
      
        let responseBody: { timestamp: string; statusCode: HttpStatus | number; message: string } = {
      statusCode: httpStatus,
      message: 'Internal Server Error',
      timestamp: new Date().toISOString(),
    };
    if (exception instanceof HttpException) {
      this.logger.error(exception);
      httpStatus = exception.getStatus();
      const response: any = exception.getResponse();
      responseBody = {
        timestamp: new Date().toISOString(),
        statusCode: exception.getStatus(),
        message: response.message ?? exception.message,
        ...response,
      };
    } else if (exception instanceof QueryFailedError) {
      if (exception.driverError.errno === PostgresError.UNIQUE_VIOLATION) {
        this.logger.log(exception);
        httpStatus = HttpStatus.BAD_REQUEST;
        responseBody = {
          statusCode: httpStatus,
          message: 'Registro duplicado',
          timestamp: new Date().toISOString(),
        };
      } else {
        this.logger.error(exception);
      }
    } else {
      this.logger.error(exception);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
