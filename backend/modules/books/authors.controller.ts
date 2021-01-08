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
import { AuthorsService } from './authors.service';
import { AuthorDto } from './dto/author.dto';
import { Author } from './entities/author.entity';

const name = 'books';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(name)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOkResponse({ description: 'Authors have been successfully read' })
  findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Author has been successfully read' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Author does not exist or has been deactivated',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Author has been succesully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({
    description: 'Author already exists',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and adminstration staff are allowed to create authors',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and adminstration staff are allowed to create authors',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  create(@Body() authorDto: AuthorDto): Promise<Author> {
    return this.authorsService.create(authorDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Author has been succesully updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Author does not exist or has been deactivated',
  })
  @ApiConflictResponse({
    description: 'Author already exists',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to update authors',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to update authors',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() authorDto: AuthorDto) {
    return this.authorsService.update(id, authorDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Author has been succesully deactivated' })
  @ApiNotFoundResponse({
    description: 'Author does not exist or has been deactivated',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to deactivate authors',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to deactivate authors',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
