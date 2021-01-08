import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthorDto {
  @ApiProperty({ description: 'Author name', required: true })
  @IsString()
  name: string;
}
