import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';
import { HttpStatus } from '@nestjs/common';

@Catch(JsonWebTokenError)
export class JWTExceptionFilter implements ExceptionFilter {
  catch(exception: JsonWebTokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { message, name } = exception;
    const error = `${name} - ${message}`;

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      message: error,
      timestamp: new Date().toISOString(),
    });
  }
}
