import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@iz/entities';
@Entity({ name: 'centers' })
export class Center extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 10 })
  code: string;

  @Column({ type: 'varchar', unique: true, length: 100 })
  denomination: string;
}
