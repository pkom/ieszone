import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateCenterDto {
  @ApiProperty({ description: 'School code', required: true })
  @IsString()
  @MaxLength(10)
  code: string;

  @ApiProperty({ description: 'School name', required: true })
  @IsString()
  @MaxLength(100)
  denomination: string;
}
