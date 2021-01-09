import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('JwtStrategy');

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtSecret'),
    });
  }

  async validate(payload: JwtPayload, done: Function) {
    try {
      const user = await this.authService.validateUser(payload);
      if (!user) {
        this.logger.error(
          `User validating user in token ${JSON.stringify(payload)}`,
        );
        throw new UnauthorizedException();
      }
      // return user;
      done(null, user);
    } catch (error) {
      this.logger.error(`Error validating token`, error.stack);
      throw new UnauthorizedException('unauthorized', error.message);
    }
  }
}
