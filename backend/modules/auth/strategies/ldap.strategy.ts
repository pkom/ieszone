import { readFileSync } from 'fs';
import { validate } from 'class-validator';
import Strategy from 'passport-ldapauth';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserLdapDto } from '../dto/user-ldap.dto';
import { UserDto } from '../../users/dto/user.dto';
import { join, resolve } from 'path';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LdapStrategy extends PassportStrategy(Strategy, 'ldap') {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    super({
      // passReqToCallback: true,
      server: {
        url: configService.get('ldap.host'),
        bindDN: configService.get('ldap.user'),
        bindCredentials: configService.get('ldap.password'),
        searchBase: 'ou=People,dc=instituto,dc=extremadura,dc=es',
        searchFilter: '(uid={{username}})',
        searchAttributes: [
          'employeeNumber',
          'cn',
          'givenName',
          'sn',
          'uid',
          'uidNumber',
          'gidNumber',
          'mail',
        ],
        groupSearchBase: 'ou=Group,dc=instituto,dc=extremadura,dc=es',
        groupSearchAttributes: ['cn'],
        groupSearchFilter:
          '(&(objectClass=groupOfNames)(memberUid={{username}}))',
        tlsOptions: {
          ca: readFileSync(
            join(resolve('ssl'), configService.get('ldap.certificate')),
          ),
        },
      },
    });
  }
  async validate(userLdapDto: UserLdapDto, done: any) {
    this.logger.debug(`Authenticating ldap user ${userLdapDto.uid}`);
    try {
      if (userLdapDto._groups) {
        userLdapDto.groups = userLdapDto._groups.map((group) => group.cn);
      }
      if (userLdapDto.groups.includes('students')) {
        this.logger.error(
          `Rejecting authentication for student ${userLdapDto.uid}`,
        );
        done(new UnauthorizedException('Login not allowed to students'), false);
      }
      delete userLdapDto.dn;
      delete userLdapDto.controls;
      delete userLdapDto._groups;
      const userDto: UserDto = {
        userName: userLdapDto.uid,
        uidNumber: userLdapDto.uidNumber,
        gidNumber: userLdapDto.gidNumber,
        employeeNumber: userLdapDto.employeeNumber,
        firstName: userLdapDto.givenName,
        lastName: userLdapDto.sn,
        email: userLdapDto.mail,
        fullName: userLdapDto.cn,
        groups: userLdapDto.groups,
      };
      const errors = await validate(UserDto);
      if (errors.length > 0) {
        this.logger.error(
          `Error validating UserDto: ${JSON.stringify(userDto)}`,
        );
        done(new BadRequestException(errors), false);
      }
      done(null, userDto);
    } catch (error) {
      this.logger.error(`Ldap authentication error`, error.stack);
      done(error, false);
    }
  }
}
