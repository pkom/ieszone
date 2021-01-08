import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Delete,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  NotFoundException,
  Patch,
  Inject,
} from '@nestjs/common';
import { CentersService } from './centers.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { UserRole } from '@iz/enum';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Center } from './entities/center.entity';
import { UpdateCenterDto } from './dto/update-center.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const name = 'centers';
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(name)
@Controller('centers')
export class CentersController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private centersService: CentersService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Centers have been successfully read' })
  getAll() {
    return this.centersService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Center has been successfully read' })
  @ApiNotFoundResponse({
    description: 'Center code does not exist',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.centersService.getById(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Center has been succesully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({
    description: 'Center code or denomination already exists',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators are allowed to create centers',
  })
  @ApiForbiddenResponse({
    description: 'Only administrators are allowed to create centers',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  create(@Body() createCenterDto: CreateCenterDto) {
    this.logger.debug(
      `Calling post method on controller centers to create center ${createCenterDto.code}`,
    );
    return this.centersService.create(createCenterDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Center has been succesully updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Center code does not exist',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators are allowed to update centers',
  })
  @ApiForbiddenResponse({
    description: 'Only administrators are allowed to update centers',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCenterDto: UpdateCenterDto,
  ) {
    return this.centersService.update(id, updateCenterDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Center has been succesully deactivated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Center code does not exist or is deactivated',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators are allowed to deactivate centers',
  })
  @ApiForbiddenResponse({
    description: 'Only administrators are allowed to deactivate centers',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  public delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.centersService.delete(id);
  }
}
