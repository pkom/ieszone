import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '@iz/entities';

import { Group } from '../../groups/entities/group.entity';
import { Book } from '../../books/entities/book.entity';

@Entity({ name: 'levels' })
export class Level extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 100 })
  level: string;

  // Bidirectional OneToMany Level to Groups
  // Level <<- Group
  @OneToMany(() => Group, (group) => group.level)
  groups: Group[];

  @OneToMany((type) => Book, (book) => book.level)
  books: Book[];
}
