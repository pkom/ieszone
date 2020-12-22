import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { config } from './config';
import { AppStatus } from '@iz/interface';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}

  appStatus(): AppStatus {
    return {
      message: `${config.appName} is running on port ${config.port}. Connected to ${this.connection.name}`,
    };
  }
}
