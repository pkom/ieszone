import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '@iz/entities';

import { CourseDepartment } from './course.department.entity';
import { Book } from '../../books/entities/book.entity';

@Entity({ name: 'departments' })
export class Department extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 100 })
  department: string;

  @Column({ type: 'varchar', unique: true, length: 100, nullable: true })
  denomination: string;

  // Bidirectional ManyToMany Course to Departments
  // Course ->> CourseDepartment <<- Department
  @OneToMany(
    () => CourseDepartment,
    (courseDepartment) => courseDepartment.department,
  )
  courseDepartments: CourseDepartment[];

  @OneToMany((type) => Book, (book) => book.department)
  books: Book[];
}
