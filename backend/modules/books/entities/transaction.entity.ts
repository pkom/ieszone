import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@iz/entities';
import { Copy } from './copy.entity';
import { User } from '../../users/entities/user.entity';
import { CopyTransaction } from '@iz/enum';
import { CourseStudent } from '../../students/entities/course.student.entity';

@Entity('copies_transactions')
export class Transaction extends BaseEntity {
  @Column()
  transaction: CopyTransaction;

  @ManyToOne((type) => User, (user) => user.transactions)
  @JoinTable()
  user: User;

  @ManyToOne((type) => Copy, (copy) => copy.transactions)
  @JoinTable()
  copy: Copy;

  @ManyToOne(
    (type) => CourseStudent,
    (courseStudent) => courseStudent.transactions,
  )
  @JoinTable()
  courseStudent: CourseStudent;
}
