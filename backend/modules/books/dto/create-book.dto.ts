import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDecimal } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Book title', required: true })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Book ISBN' })
  @IsString()
  isbn: string;

  @ApiProperty({ description: 'Book barcode prefix' })
  @IsString()
  barcode: string;

  @ApiProperty({ description: 'Book edition year' })
  @IsNumber()
  year: number;

  @ApiProperty({ description: 'Book stock' })
  @IsNumber()
  stock: number;

  @ApiProperty({ description: 'Book price' })
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;
}
