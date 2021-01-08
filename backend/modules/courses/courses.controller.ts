import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Post,
  UseGuards,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '@iz/enum';
import { CreateCourseDto } from './dto/create-course.dto';
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
import { Observable } from 'rxjs';
import { UpdateCourseDto } from './dto/update-course.dto';

const name = 'courses';
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(name)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOkResponse({ description: 'Courses have been successfully read' })
  getAll(): Observable<Course[]> {
    return this.coursesService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Course has been successfully read' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  getById(@Param('id', ParseUUIDPipe) id: string): Observable<Course> {
    return this.coursesService.getById(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Course has been succesully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({
    description: 'Course already exists',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators are allowed to create courses',
  })
  @ApiForbiddenResponse({
    description: 'Only administrators are allowed to create courses',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  create(@Body() createCourseDto: CreateCourseDto): Observable<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Course has been succesully updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({
    description: 'Course already exists',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators are allowed to update courses',
  })
  @ApiForbiddenResponse({
    description: 'Only administrators are allowed to update courses',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Observable<any> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Course has been succesully deactivated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'Course code does not exist or is deactivated',
  })
  @ApiUnauthorizedResponse({
    description:
      'Only authenticated administrators are allowed to deactivate courses',
  })
  @ApiForbiddenResponse({
    description: 'Only administrators are allowed to deactivate courses',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  public delete(@Param('id', ParseUUIDPipe) id: string): Observable<any> {
    return this.coursesService.delete(id);
  }
}
