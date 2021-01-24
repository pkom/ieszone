import { Role } from './role.model';

export interface User {
  token: string;
  refresh_token: string;
  id: string;
  userName: string;
  employeeNumber?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  role?: Role;
  roles?: Role[];
  avatar?: string;
  email?: string;
  courseId?: string;
}
