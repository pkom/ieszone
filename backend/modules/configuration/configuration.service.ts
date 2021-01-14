import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';

import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { Configuration } from './entities/configuration.entity';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepository: Repository<Configuration>,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async get(): Promise<Configuration> {
    const configuration = await this.configurationRepository.findOne({
      where: {
        isActive: true,
      },
    });
    if (!configuration) {
      throw new NotFoundException('Configuration not found');
    }
    return configuration;
  }

  async create(
    createConfigurationDto: CreateConfigurationDto,
  ): Promise<Configuration> {
    const configuration = await this.get();
    if (configuration) {
      throw new ConflictException('Configuration already exists');
    }
    return this.configurationRepository.save(
      this.configurationRepository.create(createConfigurationDto),
    );
  }

  async update(
    updateConfigurationDto: UpdateConfigurationDto,
  ): Promise<Configuration> {
    const configuration = await this.get();
    await this.configurationRepository.update(configuration.id, {
      ...updateConfigurationDto,
    });
    return this.get();
  }

  async setDefaultCourse(courseId: string): Promise<Configuration> {
    const configuration = await this.get();
    const course = await this.coursesRepository.findOne(courseId, {
      where: {
        isActive: true,
      },
    });
    if (!course) {
      throw new BadRequestException('Course does not exist');
    }
    configuration.defaultCourse = course;
    return await this.configurationRepository.save(configuration);
  }
}
