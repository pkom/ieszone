import { EventEmitter } from 'events';

import { Connection } from 'typeorm';

import { BookDTO } from '../dto';

import { getConnection } from './connection';
import { ImportBooks } from './books-additional';

export enum Events {
  BOOKS_STARTED = 'books_started',
  BOOKS_FINISHED = 'books_finished',
  BOOK_PROCESSED = 'book_processed',
}

interface ArgsOptions {
  [key: string]: any;
}

export class Book extends EventEmitter {
  private connection: Connection;
  private booksDTO: BookDTO[] = [];

  constructor(private readonly argsOptions: ArgsOptions) {
    super();
  }

  private async setup() {
    this.connection = await getConnection();
  }

  async process(): Promise<void> {
    await this.setup();
    if (this.argsOptions.booksDataCsvFile) {
      await this.processBooksCsv();
    }
  }

  private async processBooksCsv(): Promise<any> {
    const importBooks = new ImportBooks(
      this.argsOptions.booksDataCsvFile,
      this.connection,
    );
    await importBooks.processBooks();
    const booksDTO = importBooks.getBooksDTO();
    this.emit(Events.BOOKS_STARTED, booksDTO.length);
    for (const bookDTO of booksDTO) {
      await importBooks.processBook(bookDTO);
      this.emit(Events.BOOK_PROCESSED);
    }
    this.emit(Events.BOOKS_FINISHED);
  }
}
