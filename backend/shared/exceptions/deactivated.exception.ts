import { HttpException, HttpStatus } from '@nestjs/common';

export class NotActiveException extends HttpException {
  constructor(err: string) {
    super(err || 'Not active', HttpStatus.BAD_REQUEST);
  }
}
