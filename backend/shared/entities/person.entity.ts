import { Exclude } from 'class-transformer';
import { Column, Index } from 'typeorm';

import { IdType } from '@iz/enum';

import { BaseEntity } from './base.entity';

@Index(['idType', 'idNumber'], { unique: true })
@Index(['middleName', 'lastName', 'firstName'])
export abstract class PersonEntity extends BaseEntity {
  @Column({
    name: 'id_type',
    type: 'enum',
    enum: IdType,
    default: IdType.DNI,
  })
  idType: IdType;

  @Column({ name: 'id_number', type: 'varchar', length: 15, nullable: true })
  idNumber: string;

  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  firstName: string;

  @Column({ name: 'middle_name', type: 'varchar', length: 50 })
  middleName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Exclude()
  @Index()
  @Column({ type: 'varchar', length: 60, nullable: true })
  email: string;

  @Exclude()
  @Index()
  @Column({ type: 'varchar', length: 60, nullable: true })
  phone: string;

  @Exclude()
  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true })
  address: string;

  @Exclude()
  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Exclude()
  @Column({ name: 'zip_code', type: 'varchar', length: 5, nullable: true })
  @Index()
  zipCode: string;

  @Exclude()
  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true })
  state: string;

  @Exclude()
  @Column({ type: 'double precision', nullable: true })
  latitude: number;

  @Exclude()
  @Column({ type: 'double precision', nullable: true })
  longitude: number;
}
