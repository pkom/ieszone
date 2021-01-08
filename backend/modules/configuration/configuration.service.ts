import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';

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

  get(): Observable<Configuration> {
    return from(
      this.configurationRepository.findOne({
        where: {
          isActive: true,
        },
      }),
    );
  }

  create(createConfigurationDto: CreateConfigurationDto): Observable<any> {
    console.info(createConfigurationDto);
    return from(
      this.configurationRepository.save(
        this.configurationRepository.create(createConfigurationDto),
      ),
    );
  }

  update(updateConfigurationDto: UpdateConfigurationDto): Observable<any> {
    return from(
      this.configurationRepository.findOne().then((configuration) => {
        this.configurationRepository.update(configuration.id, {
          ...updateConfigurationDto,
        });
      }),
    );
  }

  setDefaultCourse(courseId: string): Observable<any> {
    return from(
      this.configurationRepository.findOne().then((configuration) => {
        this.coursesRepository
          .findOne({ id: courseId, isActive: true })
          .then((course) => {
            configuration.defaultCourse = course;
            this.configurationRepository.update(configuration.id, {
              ...configuration,
            });
          });
      }),
    );
  }
}
