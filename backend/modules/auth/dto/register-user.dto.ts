import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ description: 'User name' })
  @IsNotEmpty({ message: 'A username is required' })
  readonly username: string;

  @ApiProperty({ description: 'Password' })
  @IsNotEmpty({ message: 'A password is required to login' })
  readonly password: string;
}

export class RegisterRequest {
  @ApiProperty({ description: 'User name' })
  @IsNotEmpty({ message: 'An username is required' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'Password' })
  @IsNotEmpty({ message: 'A password is required' })
  @MinLength(6, { message: 'Your password must be at least 6 characters' })
  readonly password: string;
}

export class RefreshRequest {
  @ApiProperty({ description: 'Refresh token' })
  @IsNotEmpty({ message: 'The refresh token is required' })
  readonly refresh_token: string;
}
