import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateCourseDto {
  @ApiProperty({
    description: 'Course name in format yyyy/yyyy',
    required: true,
  })
  @IsString()
  course: string;

  @ApiProperty({ description: 'Course description', required: true })
  @IsString()
  denomination: string;
}
