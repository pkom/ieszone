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
  ParseIntPipe,
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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

const name = 'books';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(name)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ description: 'Books have been successfully read' })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Book has been successfully read' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Book does not exist or has been deactivated',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Center has been succesully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({
    description: 'Book barcode or isbn already exists',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and adminstration staff are allowed to create books',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and adminstration staff are allowed to create books',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Book has been succesully updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Book does not exist or has been deactivated',
  })
  @ApiConflictResponse({
    description: 'Book barcode or isbn already exists',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to update books',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to update books',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Book has been succesully deactivated' })
  @ApiNotFoundResponse({
    description: 'Book does not exist or has been deactivated',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to deactivate books',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to deactivate books',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @Post(':bookId/addauthor/:authorId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Author has been succesully added to book',
  })
  @ApiConflictResponse({ description: 'Book already has the author' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Book or Author does not exist or has been deactivated',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to add authors to books',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to add authors to books',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  addAuthor(
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @Param('authorId', ParseUUIDPipe) authorId: string,
  ) {
    return this.booksService.addAuthor(bookId, authorId);
  }

  @Post(':bookId/addcopy/:numCopies')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Copies has been succesully added to book',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Book does not exist or has been deactivated',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to add authors to books',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to add authors to books',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  addCopy(
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @Param('numCopies', ParseIntPipe) numCopies: number,
  ) {
    return this.booksService.addCopy(bookId, numCopies);
  }

  @Post(':bookId/setpublisher/:publisherId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Publisher has been succesully added to book',
  })
  @ApiConflictResponse({ description: 'Book already has the publisher' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Book or Publisher does not exist or has been deactivated',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to add publisher to books',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to add publisher to books',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  addPublisher(
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @Param('publisherId', ParseUUIDPipe) publisherId: string,
  ) {
    return this.booksService.setPublisher(bookId, publisherId);
  }

  @Post(':bookId/setlevel/:levelId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Level has been succesully added to book',
  })
  @ApiConflictResponse({ description: 'Book already has the level' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Book or Level does not exist or has been deactivated',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to add level to books',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to add level to books',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  addLevel(
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @Param('levelId', ParseUUIDPipe) levelId: string,
  ) {
    return this.booksService.setLevel(bookId, levelId);
  }

  @Post(':bookId/setdepartment/:departmentId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Department has been succesully added to book',
  })
  @ApiConflictResponse({ description: 'Book already has the department' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Book or Department does not exist or has been deactivated',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to add department to books',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and administration staff are allowed to add department to books',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  addDepartment(
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @Param('departmentId', ParseUUIDPipe) departmentId: string,
  ) {
    return this.booksService.setDepartment(bookId, departmentId);
  }
}
