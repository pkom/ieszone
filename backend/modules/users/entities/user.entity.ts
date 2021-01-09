import { Exclude } from 'class-transformer';

import {
  Entity,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { BaseEntity } from '@iz/entities';

import { Student } from '../../students/entities/student.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Role } from '../../roles/entities/role.entity';
import { Transaction } from '../../books/entities/transaction.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 25, unique: true })
  userName: string;

  @Exclude()
  @Column({ type: 'varchar', length: 25, nullable: true })
  uidNumber: string;

  @Exclude()
  @Column({ type: 'varchar', length: 25, nullable: true })
  gidNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  employeeNumber: string;

  @Exclude()
  @Column({ type: 'varchar', length: 150, nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @OneToOne(() => Student, { eager: true })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @OneToOne(() => Teacher, { eager: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToMany((type) => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
