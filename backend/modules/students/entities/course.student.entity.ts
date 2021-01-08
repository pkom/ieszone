import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { TimeStampEntity } from '@iz/entities';

import { Course } from '../../courses/entities/course.entity';
import { CourseGroup } from '../../groups/entities/course.group.entity';
import { CourseGroupStudent } from '../../groups/entities/course.group.student.entity';
import { Student } from './student.entity';
import { Copy } from '../../books/entities/copy.entity';
import { Transaction } from '../../books/entities/transactions.entity';

@Entity({ name: 'courses_students' })
export class CourseStudent extends TimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseId: string;

  @Column()
  studentId: string;

  // Bidirectional ManyToMany Course to Students relationship
  // Student ->> CourseStudent <<- Course
  @ManyToOne(() => Course, (course) => course.courseStudents, { primary: true })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => Student, (student) => student.courseStudents, {
    primary: true,
  })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  // Bidirectional ManyToMany CourseGroup to CourseStudent
  // CourseGroup ->> CourseGroupStudent <<- CourseStudent
  @OneToMany(
    () => CourseGroupStudent,
    (courseGroupStudent) => courseGroupStudent.courseStudent,
  )
  courseGroupStudents: CourseGroupStudent[];

  // Bidirectional OneToOne Delegate Group relationship
  // CourseGroup <-> CourseStudent
  @OneToOne(() => CourseGroup, (courseGroup) => courseGroup.delegateStudent)
  delegateGroup: CourseGroup;

  @OneToMany((type) => Copy, (copy) => copy.courseStudent)
  copies: Copy[];

  @OneToMany((type) => Transaction, (transaction) => transaction.courseStudent)
  transactions: Transaction[];
}
