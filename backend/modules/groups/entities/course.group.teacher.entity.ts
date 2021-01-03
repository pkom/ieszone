import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

import { TimeStampEntity } from '@iz/entities';

import { CourseTeacher } from '../../teachers/entities/course.teacher.entity';
import { CourseGroup } from './course.group.entity';

@Entity({ name: 'courses_groups_teachers' })
export class CourseGroupTeacher extends TimeStampEntity {
  @PrimaryColumn('uuid')
  courseGroupId: string;

  @PrimaryColumn('uuid')
  courseTeacherId: string;

  // Bidirectional ManyToMany CourseGroup to CourseTeacher
  // CourseGroup ->> CourseGroupTeacher <<- CourseTeacher
  @ManyToOne(
    () => CourseGroup,
    (courseGroup) => courseGroup.courseGroupTeachers,
    { primary: true },
  )
  @JoinColumn({ name: 'courseGroupId' })
  courseGroup: CourseGroup;

  @ManyToOne(
    () => CourseTeacher,
    (courseTeacher) => courseTeacher.courseGroupTeachers,
    { primary: true },
  )
  @JoinColumn({ name: 'courseTeacherId' })
  courseTeacher: CourseTeacher;
}
