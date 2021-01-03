import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentersService } from './centers.service';
import { CentersController } from './centers.controller';
import { Center } from './entities/center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Center])],
  providers: [CentersService],
  controllers: [CentersController],
})
export class CentersModule {}
