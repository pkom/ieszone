import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PublisherDto {
  @ApiProperty({ description: 'Publisher name', required: true })
  @IsString()
  name: string;
}
