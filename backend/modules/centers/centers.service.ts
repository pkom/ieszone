import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Center } from './entities/center.entity';
import { Repository } from 'typeorm';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class CentersService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(Center)
    private readonly centersRepository: Repository<Center>,
  ) {}

  getAll() {
    return this.centersRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  async getById(id: string) {
    const center = await this.centersRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });
    if (!center) {
      throw new NotFoundException(
        `Center ${id} doesn't exist or it's not active`,
      );
    }
    return center;
  }

  async getByCode(code: string) {
    const center = await this.centersRepository.findOne({
      where: {
        code,
        isActive: true,
      },
    });
    if (!center) {
      throw new NotFoundException(
        `Center ${code} doesn't exist or it's not active`,
      );
    }
    return center;
  }

  async create(createCenterDto: CreateCenterDto) {
    const center = await this.centersRepository.findOne({
      where: [
        { code: createCenterDto.code },
        { denomination: createCenterDto.denomination },
      ],
    });
    if (center) {
      throw new ConflictException(
        `Center ${createCenterDto.code} already exists`,
      );
    }
    return this.centersRepository.save(
      this.centersRepository.create(createCenterDto),
    );
  }

  async update(id: string, updateCenterDto: UpdateCenterDto) {
    const center = await this.centersRepository.preload({
      id,
      ...updateCenterDto,
    });
    if (!center) {
      throw new NotFoundException(`Center ${id} not found`);
    }
    return this.centersRepository.save(center);
  }

  async delete(id: string) {
    const center = await this.centersRepository.preload({
      id,
      isActive: false,
    });
    if (!center) {
      throw new NotFoundException(`Center ${id} not found`);
    }
    return this.centersRepository.save(center);
  }
}
