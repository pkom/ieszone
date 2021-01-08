import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { from, Observable } from 'rxjs';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  getAll(): Observable<Course[]> {
    return from(
      this.coursesRepository.find({
        where: {
          isActive: true,
        },
      }),
    );
  }

  getById(id): Observable<Course> {
    return from(
      this.coursesRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      }),
    );
  }

  create(createCourseDto: CreateCourseDto): Observable<Course> {
    return from(
      this.coursesRepository.save(
        this.coursesRepository.create(createCourseDto),
      ),
    );
  }

  update(id: string, updateCourseDto: UpdateCourseDto): Observable<any> {
    return from(this.coursesRepository.update(id, { ...updateCourseDto }));
  }

  delete(id: string): Observable<any> {
    return from(
      this.coursesRepository.update(id, {
        isActive: false,
      }),
    );
  }
}
