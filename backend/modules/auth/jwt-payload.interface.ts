import { UserRole } from '@iz/enum';

export interface JwtPayload {
  username: string;
  sub: string;
  courseid: string;
  roles: UserRole[];
}
