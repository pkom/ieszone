import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from '@iz/entities';
import { Book } from './book.entity';
import { Exclude } from 'class-transformer';

@Entity('authors')
export class Author extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Exclude()
  @Column({ unique: true })
  nameLowerCased: string;

  @ManyToMany((type) => Book, (book) => book.authors)
  books: Book[];

  @BeforeInsert()
  @BeforeUpdate()
  toLowerCase() {
    this.nameLowerCased = this.name.toLowerCase();
  }
}
