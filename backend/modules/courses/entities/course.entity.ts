import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '@iz/entities';

import { CourseDepartment } from '../../departments/entities/course.department.entity';
import { CourseGroup } from '../../groups/entities/course.group.entity';
import { CourseStudent } from '../../students/entities/course.student.entity';
import { CourseTeacher } from '../../teachers/entities/course.teacher.entity';

@Entity({ name: 'courses' })
export class Course extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 9 })
  course: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  denomination: string;

  // Bidirectional ManyToMany Course to Students relationship
  // Course ->> CourseStudent <<- Student
  @OneToMany(() => CourseStudent, (courseStudent) => courseStudent.course)
  courseStudents: CourseStudent[];

  // Bidirectional ManyToMany Course to Teachers relationship
  // Course ->> CourseTeacher <<- Teacher

  @OneToMany(() => CourseTeacher, (courseTeacher) => courseTeacher.course)
  courseTeachers: CourseTeacher[];

  // Bidirectional ManyToMany Course to Groups
  // Course ->> CourseGroup <<- Group

  @OneToMany(() => CourseGroup, (courseGroup) => courseGroup.course)
  courseGroups: CourseGroup[];

  // Bidirectional ManyToMany Course to Departments
  // Course ->> CourseDepartment <<- Department

  @OneToMany(
    () => CourseDepartment,
    (courseDepartment) => courseDepartment.course,
  )
  courseDepartments: CourseDepartment[];
}
