import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppStatus } from '@iz/interface';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private connection: Connection,
    private readonly configService: ConfigService,
  ) {}

  appStatus(): AppStatus {
    return {
      message: `${this.configService.get(
        'appName',
      )} is running on port ${this.configService.get('port')}. Connected to ${
        this.connection.options.database
      } database on ${this.configService.get('database.host')}`,
    };
  }
}
