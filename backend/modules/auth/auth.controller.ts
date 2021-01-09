import { compare } from 'bcrypt';

import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
  Inject,
  UnauthorizedException,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { LdapAuthGuard } from '../../shared/guards/ldap-auth.guard';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserDecorator } from '../../shared/decorators/user.decorator';
import { UserLoginDto } from './dto/user-login.dto';
import { Logger } from 'winston';
import { AuthenticationPayload } from './dto/response-token.dto';
import { RefreshTokenService } from './refresh-token.service';
import { User } from '../users/entities/user.entity';
import {
  LoginRequest,
  RefreshRequest,
  RegisterRequest,
} from './dto/register-user.dto';
import { UsersService } from '../users/users.service';
import { classToPlain } from 'class-transformer';

const name = 'authentication';
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(name)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly usersService: UsersService,
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
  login(@Request() req, @Body() userLoginDto: UserLoginDto) {
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
  getProfile(@UserDecorator() user) {
    this.logger.debug(`user ${user.username} is retrieving his profile`);
    return user;
  }

  // Logic for access-token and refresh-token used from:
  // https://medium.com/javascript-in-plain-english/nestjs-implementing-access-refresh-token-jwt-authentication-97a39e448007
  @Post('/loginlocal')
  public async loginLocal(@Body() body: LoginRequest) {
    const { username, password } = body;

    const user = await this.usersService.findForUsername(username);

    // ldap users local authentication
    if (!user.password) {
      user.password = '';
      throw new UnauthorizedException('The login is invalid');
    }

    const valid = user ? await this.validateCredentials(user, password) : false;

    if (!valid) {
      throw new UnauthorizedException('The login is invalid');
    }

    const token = await this.refreshTokenService.generateAccessToken(user);
    const refresh = await this.refreshTokenService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    const payload = this.buildResponsePayload(user, token, refresh);

    return {
      status: 'success',
      ...payload,
    };
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'User has been registered' })
  @ApiConflictResponse({ description: 'User already exists' })
  @ApiBadRequestResponse({
    description: 'Incorrect parameters have been submitted',
  })
  public async register(@Body() body: RegisterRequest) {
    const user = await this.usersService.createUserFromRequest(body);

    const token = await this.refreshTokenService.generateAccessToken(user);
    const refresh = await this.refreshTokenService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    const payload = this.buildResponsePayload(user, token, refresh);

    return {
      status: 'success',
      data: payload,
    };
  }

  @ApiCreatedResponse({ description: 'Token has been refreshed' })
  @ApiUnprocessableEntityResponse({ description: 'Invalid Token' })
  @Post('refresh')
  public async refresh(@Body() body: RefreshRequest) {
    const {
      user,
      token,
    } = await this.refreshTokenService.createAccessTokenFromRefreshToken(
      body.refresh_token,
    );

    const payload = this.buildResponsePayload(user, token);

    return {
      status: 'success',
      data: payload,
    };
  }

  private buildResponsePayload(
    user: User,
    accessToken: string,
    refreshToken?: string,
  ): AuthenticationPayload {
    return {
      user: classToPlain(user),
      payload: {
        type: 'bearer',
        token: accessToken,
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
      },
    };
  }

  public async validateCredentials(
    user: User,
    password: string,
  ): Promise<boolean> {
    return compare(password, user.password);
  }
}
