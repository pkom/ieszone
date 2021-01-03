import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

import { TimeStampEntity } from '@iz/entities';

import { CourseStudent } from '../../students/entities/course.student.entity';
import { CourseGroup } from './course.group.entity';

@Entity({ name: 'courses_groups_students' })
export class CourseGroupStudent extends TimeStampEntity {
  @PrimaryColumn('uuid')
  courseGroupId: string;

  @PrimaryColumn('uuid')
  courseStudentId: string;

  // Bidirectional ManyToMany CourseGroup to CourseStudent
  // CourseGroup ->> CourseGroupStudent <<- CourseStudent
  @ManyToOne(
    () => CourseGroup,
    (courseGroup) => courseGroup.courseGroupStudents,
    { primary: true },
  )
  @JoinColumn({ name: 'courseGroupId' })
  courseGroup: CourseGroup;

  @ManyToOne(
    () => CourseStudent,
    (courseStudent) => courseStudent.courseGroupStudents,
    { primary: true },
  )
  @JoinColumn({ name: 'courseStudentId' })
  courseStudent: CourseStudent;
}
