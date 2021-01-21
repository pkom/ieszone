import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository, UpdateResult } from 'typeorm';
import { Logger } from 'winston';
import { CopyStatus } from '../../enums';
import { Department } from '../departments/entities/department.entity';
import { Level } from '../levels/entities/level.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import { Copy } from './entities/copy.entity';
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
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Copy)
    private readonly copyRepository: Repository<Copy>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['authors', 'publisher', 'level', 'department', 'copies'],
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne(
      { id, isActive: true },
      {
        relations: ['authors', 'publisher', 'level', 'department', 'copies'],
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
      relations: ['authors', 'publisher', 'level', 'department', 'copies'],
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
        relations: ['authors', 'publisher', 'level', 'department', 'copies'],
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

  async addCopy(bookId: string, numCopies = 1): Promise<Book> {
    if (numCopies > 20) {
      throw new BadRequestException(
        'A maximum of 20 copies can be added per request',
      );
    }
    const book = await this.bookRepository.findOne(
      {
        id: bookId,
        isActive: true,
      },
      {
        relations: ['authors', 'publisher', 'level', 'department', 'copies'],
      },
    );
    if (!book) {
      throw new NotFoundException('Book not found or deactivated');
    }
    if (!book.barcode) {
      throw new BadRequestException('Book must have a barcode');
    }
    const firstCopy = book.stock + 1 || 1;
    for (let i = firstCopy; i <= numCopies; i++) {
      const copy = new Copy();
      copy.barcode = this.generateBarcode(book.barcode, i);
      copy.status = CopyStatus.AVAILABLE;
      await this.copyRepository.save(copy);
      book.copies.push(copy);
    }
    return this.bookRepository.save(book);
  }

  private generateBarcode(barcode: string, i: number): string {
    const iStr = i.toString();
    return `${barcode}${iStr.padStart(4, '0')}`;
  }

  async setPublisher(bookId: string, publisherId: string): Promise<Book> {
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

  async setLevel(bookId: string, levelId: string): Promise<Book> {
    const book = await this.bookRepository.findOne(
      {
        id: bookId,
        isActive: true,
      },
      {
        relations: ['authors', 'publisher', 'level', 'department'],
      },
    );
    if (!book) {
      throw new NotFoundException('Book not found or deactivated');
    }
    const level = await this.levelRepository.findOne({
      id: levelId,
      isActive: true,
    });
    if (!level) {
      throw new NotFoundException('Level not found or deactivated');
    }
    if (book.level && book.level.id === levelId) {
      throw new ConflictException('Book already has level');
    }
    book.level = level;
    return this.bookRepository.save(book);
  }

  async setDepartment(bookId: string, departmentId: string): Promise<Book> {
    const book = await this.bookRepository.findOne(
      {
        id: bookId,
        isActive: true,
      },
      {
        relations: ['authors', 'publisher', 'level', 'department'],
      },
    );
    if (!book) {
      throw new NotFoundException('Book not found or deactivated');
    }
    const department = await this.departmentRepository.findOne({
      id: departmentId,
      isActive: true,
    });
    if (!department) {
      throw new NotFoundException('Department not found or deactivated');
    }
    if (book.department && book.department.id === departmentId) {
      throw new ConflictException('Book already has department');
    }
    book.department = department;
    return this.bookRepository.save(book);
  }
}
