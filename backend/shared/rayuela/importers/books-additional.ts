import csvtojson from 'csvtojson';

import { Connection } from 'typeorm';
import { Author } from '../../../modules/books/entities/author.entity';
import { Book } from '../../../modules/books/entities/book.entity';
import { Copy } from '../../../modules/books/entities/copy.entity';
import { Publisher } from '../../../modules/books/entities/publisher.entity';

import { BookDTO } from '../dto';
import { CopyStatus } from '../../../enums/copy-status.enum';
import { Level } from '../../../modules/levels/entities/level.entity';

export class ImportBooks {
  private booksDTO: BookDTO[] = [];

  constructor(
    private readonly booksDataCsvFile: string,
    private readonly connection: Connection,
  ) {}

  async processBooks(): Promise<void> {
    this.booksDTO = await csvtojson().fromFile(this.booksDataCsvFile);
  }

  async processBook(bookDTO: BookDTO): Promise<any> {
    const bookRepo = this.connection.getRepository(Book);
    const copyRepo = this.connection.getRepository(Copy);
    const publisherRepo = this.connection.getRepository(Publisher);
    const levelRepo = this.connection.getRepository(Level);
    const authorRepo = this.connection.getRepository(Author);

    let author = new Author();
    author.name = bookDTO.autor;
    const authorDB = await authorRepo.findOne({
      name: bookDTO.autor,
    });
    if (!authorDB) {
      author = await authorRepo.save(authorRepo.create(author));
    } else {
      await authorRepo.update(authorDB.id, { ...author });
      author = await authorRepo.findOne(authorDB.id);
    }

    let publisher = new Publisher();
    publisher.name = bookDTO.editorial;
    const publisherDB = await publisherRepo.findOne({
      name: bookDTO.editorial,
    });
    if (!publisherDB) {
      publisher = await publisherRepo.save(publisherRepo.create(publisher));
    } else {
      await publisherRepo.update(publisherDB.id, { ...publisher });
      publisher = await publisherRepo.findOne(publisherDB.id);
    }

    const level = await levelRepo.findOne({
      level: `${bookDTO.nivel}º E.S.O.`,
    });

    const bookDB = await bookRepo.findOne({
      barcode: bookDTO.codigo_barras_libro,
    });
    let book = new Book();
    book.title = bookDTO.libros;
    book.isbn = bookDTO.isbn;
    book.barcode = bookDTO.codigo_barras_libro;
    book.year = +bookDTO.anio_edicion || 0;
    book.startDate = new Date(bookDTO.fecha_inicio);
    book.endDate = new Date(bookDTO.fecha_fin);
    book.stock = +bookDTO.numero_ejemplares || 0;
    book.price = +bookDTO.precio || 0;
    book.publisher = publisher;
    book.level = level || null;
    book.authors = [author];
    if (!bookDB) {
      book = await bookRepo.save(bookRepo.create(book));
    } else {
      await bookRepo.update(bookDB.id, { ...book });
      book = await bookRepo.findOne(bookDB.id);
    }

    const copyDB = await copyRepo.findOne({
      barcode: bookDTO.codigo_barras_ejemplar,
    });
    let copy = new Copy();
    copy.barcode = bookDTO.codigo_barras_ejemplar;
    copy.status = CopyStatus.AVAILABLE;
    copy.book = book;
    if (!copyDB) {
      copy = await copyRepo.save(copyRepo.create(copy));
    } else {
      await copyRepo.update(copyDB.id, { ...copy });
    }
  }

  getBooksDTO(): BookDTO[] {
    return this.booksDTO;
  }
}
