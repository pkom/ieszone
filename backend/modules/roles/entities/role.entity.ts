import { Exclude } from 'class-transformer';
import { Entity, Column, ManyToMany } from 'typeorm';

import { BaseEntity } from '@iz/entities';

import { User } from '../../users/entities/user.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 25, unique: true })
  name: string;

  @Exclude()
  @Column({ type: 'varchar', length: 50, nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
