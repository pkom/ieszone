import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@iz/entities';
import { Book } from './book.entity';
import { Exclude } from 'class-transformer';

@Entity('publishers')
export class Publisher extends BaseEntity {
  @Column()
  name: string;

  @Exclude()
  @Column({ unique: true })
  nameLowerCased: string;

  @OneToMany((type) => Book, (book) => book.publisher)
  books: Book[];

  @BeforeInsert()
  @BeforeUpdate()
  toLowerCase() {
    this.nameLowerCased = this.name.toLowerCase();
  }
}
