import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '@iz/entities';

import { Course } from '../../courses/entities/course.entity';

@Entity({ name: 'configuration' })
export class Configuration extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  center: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  faxNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  headMaster: string;

  @OneToOne(() => Course, { eager: true })
  @JoinColumn()
  defaultCourse: Course;
}
