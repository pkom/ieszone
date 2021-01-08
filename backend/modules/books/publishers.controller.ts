import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
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
import { UserRole } from '@iz/enum';
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { PublishersService } from './publishers.service';
import { PublisherDto } from './dto/publisher.dto';
import { Publisher } from './entities/publisher.entity';

const name = 'books';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(name)
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  @ApiOkResponse({ description: 'Publishers have been successfully read' })
  findAll(): Promise<Publisher[]> {
    return this.publishersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Publisher has been successfully read' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Publisher does not exist or has been deactivated',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Publisher> {
    return this.publishersService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Publisher has been succesully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({
    description: 'Publisher already exists',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and adminstration staff are allowed to create publishers',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and adminstration staff are allowed to create publishers',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  create(@Body() publisherDto: PublisherDto): Promise<Publisher> {
    return this.publishersService.create(publisherDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Publisher has been succesully updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Publisher does not exist or has been deactivated',
  })
  @ApiConflictResponse({
    description: 'publisher already exists',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to update publishers',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to update publishers',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() publisherDto: PublisherDto,
  ) {
    return this.publishersService.update(id, publisherDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'publisher has been succesully deactivated' })
  @ApiNotFoundResponse({
    description: 'publisher does not exist or has been deactivated',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to deactivate publishers',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to deactivate publishers',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  remove(@Param('id') id: string) {
    return this.publishersService.remove(id);
  }
}
