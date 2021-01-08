import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

@Catch(QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const { message, name } = exception;
    const error = `${name} - ${message}`;

    response.status(HttpStatus.BAD_REQUEST).json({
      message: error,
      timestamp: new Date().toISOString(),
    });
  }
}
