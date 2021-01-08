import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';
import { CourseStudent } from './entities/course.student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, CourseStudent])],
  providers: [StudentsService],
  exports: [TypeOrmModule],
})
export class StudentsModule {}
