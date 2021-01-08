import { Exclude } from 'class-transformer';
import { PrimaryGeneratedColumn, Column, VersionColumn } from 'typeorm';

import { TimeStampEntity } from './timestamp.entity';

export abstract class BaseEntity extends TimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Exclude()
  @Column({ name: 'is_archived', type: 'boolean', default: false })
  isArchived: boolean;

  @Exclude()
  @VersionColumn({ nullable: true })
  version: number;
}
