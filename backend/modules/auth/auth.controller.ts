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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const name = 'authentication';

@ApiTags(name)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {}

  @ApiCreatedResponse({
    description: 'User has been successfully authenticated',
  })
  @ApiBadRequestResponse({
    description: 'Incorrect parameters have been submitted',
  })
  @ApiUnauthorizedResponse({
    description: 'Incorrect credentials have been submitted',
  })
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

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User profile has been successfully read',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user) {
    this.logger.debug(`user ${user.username} is retrieving his profile`);
    return user;
  }
}
