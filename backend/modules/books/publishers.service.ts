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
import { PublisherDto } from './dto/publisher.dto';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublishersService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  findAll(): Promise<Publisher[]> {
    return this.publisherRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: string): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne(id);
    if (!publisher) {
      throw new NotFoundException(`Publisher not found`);
    }
    return publisher;
  }

  async create(publisherDto: PublisherDto): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne({
      where: { nameLowerCased: publisherDto.name.toLowerCase() },
    });
    if (publisher) {
      throw new ConflictException(`A publisher with that name already exists`);
    }
    return this.publisherRepository.save(
      this.publisherRepository.create(publisherDto),
    );
  }

  async update(id: string, publisherDto: PublisherDto): Promise<Publisher> {
    const updateResult: UpdateResult = await this.publisherRepository.update(
      id,
      {
        ...publisherDto,
      },
    );
    const { affected } = updateResult;
    if (!affected) {
      throw new NotFoundException(`Publisher not found`);
    }
    return this.publisherRepository.findOne(id);
  }

  async remove(id: string): Promise<any> {
    const updateResult: UpdateResult = await this.publisherRepository.update(
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
      throw new NotFoundException(`Publisher not found or deactivated`);
    }
    return affected;
  }
}
