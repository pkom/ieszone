import {
  Get,
  Post,
  Controller,
  Body,
  ParseUUIDPipe,
  Param,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Patch,
} from '@nestjs/common';
import { Configuration } from './entities/configuration.entity';
import { ConfigurationService } from './configuration.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '@iz/enum';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';

const name = 'configuration';
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(name)
@Controller('configuration')
export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  @Get()
  @ApiOkResponse({ description: 'Configuration has been successfully read' })
  public get(): Observable<Configuration> {
    return this.configurationService.get();
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Configuration has been succesully created',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({
    description: 'Configuration already exists',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators are allowed to create the configuration',
  })
  @ApiForbiddenResponse({
    description: 'Only administrators are allowed to create the configuration',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  public create(
    @Body() createConfigurationDto: CreateConfigurationDto,
  ): Observable<Configuration> {
    return this.configurationService.create(createConfigurationDto);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Configuration has been succesully updated',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators are allowed to create the configuration',
  })
  @ApiForbiddenResponse({
    description: 'Only administrators are allowed to create the configuration',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  public update(
    @Body() updateConfigurationDto: UpdateConfigurationDto,
  ): Observable<any> {
    return this.configurationService.update(updateConfigurationDto);
  }

  @Post(':courseId/setdefaultcourse')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Default course has been succesfully set',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators are allowed to set the default course',
  })
  @ApiForbiddenResponse({
    description: 'Only administrators are allowed to set the default course',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  public setDefaultCourse(
    @Param('courseId', ParseUUIDPipe) courseId: string,
  ): Observable<Configuration> {
    return this.configurationService.setDefaultCourse(courseId);
  }
}
