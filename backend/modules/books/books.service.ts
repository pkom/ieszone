import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository, UpdateResult } from 'typeorm';
import { Logger } from 'winston';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['authors', 'publisher'],
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne(
      { id, isActive: true },
      {
        relations: ['authors', 'publisher'],
      },
    );
    if (!book) {
      throw new NotFoundException(`Book not found or deactivated`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: [{ isbn: createBookDto.isbn }, { barcode: createBookDto.barcode }],
    });
    if (book) {
      throw new ConflictException(
        `A book with that barcode or isbn already exists`,
      );
    }
    return this.bookRepository.save(this.bookRepository.create(createBookDto));
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updateResult: UpdateResult = await this.bookRepository.update(
      { id, isActive: true },
      {
        ...updateBookDto,
      },
    );
    const { affected } = updateResult;
    if (!affected) {
      throw new NotFoundException(`Book not found or deactivated`);
    }
    return this.bookRepository.findOne(id, {
      relations: ['authors', 'publisher'],
    });
  }

  async remove(id: string): Promise<any> {
    const updateResult: UpdateResult = await this.bookRepository.update(
      {
        id,
        isActive: true,
      },
      {
        isActive: false,
      },
    );
    const { affected } = updateResult;
    if (!affected) {
      throw new NotFoundException(`Book not found or deactivated`);
    }
    return affected;
  }

  async addAuthor(bookId: string, authorId: string): Promise<Book> {
    const book = await this.bookRepository.findOne(
      {
        id: bookId,
        isActive: true,
      },
      {
        relations: ['authors', 'publisher'],
      },
    );
    if (!book) {
      throw new NotFoundException('Book not found or deactivated');
    }
    const author = await this.authorRepository.findOne({
      id: authorId,
      isActive: true,
    });
    if (!author) {
      throw new NotFoundException('Author not found or deactivated');
    }
    const authorsFiltered = book.authors.filter((aut) => aut.id === author.id);
    if (authorsFiltered.length > 0) {
      throw new ConflictException('Book already has author');
    }
    book.authors.push(author);
    return this.bookRepository.save(book);
  }

  async addPublisher(bookId: string, publisherId: string): Promise<Book> {
    const book = await this.bookRepository.findOne(
      {
        id: bookId,
        isActive: true,
      },
      {
        relations: ['authors', 'publisher'],
      },
    );
    if (!book) {
      throw new NotFoundException('Book not found or deactivated');
    }
    const publisher = await this.publisherRepository.findOne({
      id: publisherId,
      isActive: true,
    });
    if (!publisher) {
      throw new NotFoundException('Publisher not found or deactivated');
    }
    if (book.publisher && book.publisher.id === publisherId) {
      throw new ConflictException('Book already has publisher');
    }
    book.publisher = publisher;
    return this.bookRepository.save(book);
  }
}
