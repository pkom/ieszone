import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRole } from '@iz/enum';
import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { TransactionsService } from './transactions.service';
import { Copy } from './entities/copy.entity';

const name = 'books';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(name)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('input/:copyId/:userId/:courseStudentId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'A book copy has been returned from a student',
  })
  @ApiNotFoundResponse({ description: 'Copy, user or students not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators and adminstration staff are allowed to return books from students',
  })
  @ApiForbiddenResponse({
    description:
      'Only authenticated administrators and adminstration staff are allowed to return books from students',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR, UserRole.ADMINISTRATION)
  input(
    @Param('copyId', ParseUUIDPipe) copyId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('courseStudentId', ParseUUIDPipe) courseStudentId: string,
  ): Promise<Copy> {
    return this.transactionsService.input(copyId, userId, courseStudentId);
  }

  @Post('output/:copyId/:userId/:courseStudentId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'A book copy has been returned from a student',
  })
  @ApiNotFoundResponse({ description: 'Copy, user or students not found' })
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
  output(
    @Param('copyId', ParseUUIDPipe) copyId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('courseStudentId', ParseUUIDPipe) courseStudentId: string,
  ): Promise<Copy> {
    return this.transactionsService.output(copyId, userId, courseStudentId);
  }
}
