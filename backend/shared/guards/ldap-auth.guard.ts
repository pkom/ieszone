import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LdapAuthGuard extends AuthGuard('ldap') {}
//   constructor(
//     @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
//   ) {
//     super();
//   }

//   canActivate(context: ExecutionContext) {
//     // Add your custom authentication logic here
//     // for example, call super.logIn(request) to establish a session.
//     return super.canActivate(context);
//   }

//   handleRequest(err, user, info, status) {
//     // You can throw an exception based on either "info" or "err" arguments
//     this.logger.info(
//       'Testing logger winston logger on ldap auth guard handlerequest method',
//     );
//     if (!err && !user) {
//       if (status === 401) {
//         throw new UnauthorizedException(info.message);
//       } else {
//         throw new BadRequestException(info.message);
//       }
//     }
//     if (err || !user) {
//       throw err || new UnauthorizedException();
//     }
//     return user;
//   }
// }
