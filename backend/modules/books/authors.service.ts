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
import { AuthorDto } from './dto/author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  findAll(): Promise<Author[]> {
    return this.authorRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne(id);
    if (!author) {
      throw new NotFoundException(`Author not found`);
    }
    return author;
  }

  async create(authorDto: AuthorDto): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { nameLowerCased: authorDto.name.toLowerCase() },
    });
    if (author) {
      throw new ConflictException(`An author with that name already exists`);
    }
    return this.authorRepository.save(this.authorRepository.create(authorDto));
  }

  async update(id: string, authorDto: AuthorDto): Promise<Author> {
    const updateResult: UpdateResult = await this.authorRepository.update(id, {
      ...authorDto,
    });
    const { affected } = updateResult;
    if (!affected) {
      throw new NotFoundException(`Author not found`);
    }
    return this.authorRepository.findOne(id);
  }

  async remove(id: string): Promise<any> {
    const updateResult: UpdateResult = await this.authorRepository.update(
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
      throw new NotFoundException(`Author not found or deactivated`);
    }
    return affected;
  }
}
