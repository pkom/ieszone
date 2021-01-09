import { UserRole } from '../../../enums';

export interface ResponseTokenDto {
  token: string;
}

export interface AuthenticationPayload {
  user: Record<string, unknown>;
  courseId?: string;
  roles?: UserRole[];
  payload: {
    type: string;
    token: string;
    refresh_token?: string;
  };
}
