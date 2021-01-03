import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

import { TimeStampEntity } from '@iz/entities';

import { CourseTeacher } from '../../teachers/entities/course.teacher.entity';
import { CourseDepartment } from './course.department.entity';

@Entity({ name: 'courses_departments_teachers' })
export class CourseDepartmentTeacher extends TimeStampEntity {
  @PrimaryColumn('uuid')
  courseDepartmentId: string;

  @PrimaryColumn('uuid')
  courseTeacherId: string;

  // Bidirectional ManyToMany CourseDepartment to CourseTeacher
  // CourseDepartment ->> CourseDepartmentTeacher <<- CourseTeacher
  @ManyToOne(
    () => CourseDepartment,
    (courseDepartment) => courseDepartment.courseDepartmentTeachers,
    { primary: true },
  )
  @JoinColumn({ name: 'courseDepartmentId' })
  courseDepartment: CourseDepartment;

  @ManyToOne(
    () => CourseTeacher,
    (courseTeacher) => courseTeacher.courseDepartmentTeachers,
    { primary: true },
  )
  @JoinColumn({ name: 'courseTeacherId' })
  courseTeacher: CourseTeacher;
}
