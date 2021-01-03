import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { PersonEntity, Rayuela } from '@iz/entities';

import { Parent } from '../../parents/entities/parent.entity';
import { CourseStudent } from './course.student.entity';

@Entity({ name: 'students' })
export class Student extends PersonEntity {
  @Column({ type: 'int', unique: true })
  nie: number;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  photoFile: string;

  @Column({ nullable: true })
  photoBase64: string;

  @Column(() => Rayuela)
  rayuela: Rayuela;

  @Column({ nullable: true })
  fileId: number;

  // Bidirectional ManyToMany Student to Courses relationship
  // Student ->> CourseStudent <<- Course
  @OneToMany(() => CourseStudent, (courseStudent) => courseStudent.student)
  courseStudents: CourseStudent[];

  // Bidirectional ManyToMany Student to Parent
  // Student ->> StudentParent <<- Parent
  @ManyToMany(() => Parent, (parent) => parent.students)
  @JoinTable({ name: 'students_parents' })
  parents: Parent[];
}
