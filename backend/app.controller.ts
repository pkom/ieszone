import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppStatus } from '@iz/interface';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

const name = 'status';
@ApiTags(name)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Application status' })
  healthCheck(): AppStatus {
    return this.appService.appStatus();
  }
}
