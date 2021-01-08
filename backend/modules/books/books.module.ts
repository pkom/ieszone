import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import { Copy } from './entities/copy.entity';
import { Transaction } from './entities/transactions.entity';
import { Publisher } from './entities/publisher.entity';
import { AuthorsService } from './authors.service';
import { PublishersService } from './publishers.service';
import { AuthorsController } from './authors.controller';
import { PublishersController } from './publishers.controller';
import { TransactionsService } from './transactions.service';
import { UsersModule } from '../users/users.module';
import { LevelsModule } from '../levels/levels.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, Book, Copy, Transaction, Publisher]),
    UsersModule,
    LevelsModule,
    StudentsModule,
  ],
  controllers: [BooksController, AuthorsController, PublishersController],
  providers: [
    BooksService,
    AuthorsService,
    PublishersService,
    TransactionsService,
  ],
})
export class BooksModule {}
