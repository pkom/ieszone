import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '@iz/entities';
import { Author } from './author.entity';
import { Level } from '../../levels/entities/level.entity';
import { Publisher } from './publisher.entity';
import { Copy } from './copy.entity';
import { Department } from '../../departments/entities/department.entity';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true, nullable: true })
  isbn: string;

  @Column({ unique: true, nullable: true })
  barcode: string;

  @Column({ nullable: true })
  year: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @Column({ nullable: true })
  portrait: string;

  @OneToMany((type) => Copy, (copy) => copy.book)
  copies: Copy[];

  @ManyToMany((type) => Author, (author) => author.books)
  @JoinTable({ name: 'books_authors' })
  authors: Author[];

  @ManyToOne((type) => Level)
  @JoinTable()
  level: Level;

  @ManyToOne((type) => Publisher)
  @JoinTable()
  publisher: Publisher;

  @ManyToOne((type) => Department, (department) => department.books)
  @JoinTable()
  department: Department;
}
