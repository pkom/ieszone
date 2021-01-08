import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  IsUUID,
  IsUrl,
  IsPhoneNumber,
} from 'class-validator';

export class CreateConfigurationDto {
  @ApiProperty({ description: 'School name', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  center: string;

  @ApiProperty({ description: 'School code', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  code: string;

  @ApiProperty({ description: 'Street address', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  address?: string;

  @ApiProperty({ description: 'City address', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(25)
  city?: string;

  @ApiProperty({ description: 'State address', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(25)
  state?: string;

  @ApiProperty({ description: 'Phone number', required: false })
  @IsOptional()
  @IsPhoneNumber('ES')
  @MaxLength(20)
  phoneNumber?: string;

  @ApiProperty({ description: 'Fax number', required: false })
  @IsOptional()
  @IsPhoneNumber('ES')
  @MaxLength(20)
  faxNumber?: string;

  @ApiProperty({ description: 'Email', required: false })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiProperty({ description: 'Web site', required: false })
  @IsOptional()
  @IsUrl()
  @MaxLength(100)
  url?: string;

  @ApiProperty({ description: 'Headmaster', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  headMaster?: string;
}
