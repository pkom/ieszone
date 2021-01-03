import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { LdapAuthGuard } from '../../shared/guards/ldap-auth.guard';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { User } from '../../shared/decorators/user.decorator';
import { UserLoginDto } from './dto/user-login.dto';
import { Logger } from 'winston';
import { ResponseTokenDto } from './dto/response-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LdapAuthGuard)
  @Post('login')
  login(
    @Request() req,
    @Body() userLoginDto: UserLoginDto,
  ): Promise<ResponseTokenDto> {
    this.logger.debug(
      `user ${userLoginDto.username} has been authenticated by ldap server`,
    );
    return this.authService.validateLdapLogin(req.user, userLoginDto.courseid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user) {
    this.logger.verbose(`user ${user.username} is retrieving his profile`);
    return user;
  }
}
