import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CourseDepartment } from './entities/course.department.entity';
import { CourseDepartmentTeacher } from './entities/course.department.teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Department,
      CourseDepartment,
      CourseDepartmentTeacher,
    ]),
  ],
  providers: [DepartmentsService],
  exports: [TypeOrmModule],
})
export class DepartmentsModule {}
