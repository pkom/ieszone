import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@iz/entities';
import { Book } from './book.entity';
import { Transaction } from './transaction.entity';
import { CourseStudent } from '../../students/entities/course.student.entity';
import { CopyStatus } from '@iz/enum';

@Entity('copies')
export class Copy extends BaseEntity {
  @Column()
  status: CopyStatus;

  @Column()
  barcode: string;

  @ManyToOne((type) => Book, (book) => book.copies)
  @JoinTable()
  book: Book;

  @ManyToOne((type) => CourseStudent, (courseStudent) => courseStudent.copies)
  @JoinTable()
  courseStudent: CourseStudent;

  @OneToMany((type) => Transaction, (transaction) => transaction.copy)
  transactions: Transaction[];
}
