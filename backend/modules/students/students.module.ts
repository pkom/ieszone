import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentsService],
  controllers: [],
})
export class StudentsModule {}
