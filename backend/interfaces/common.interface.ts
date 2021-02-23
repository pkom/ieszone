import { Actions, Role, Controls, CRUD } from '@iz/enum';
import { HttpStatus } from '@nestjs/common';

export interface AppStatus {
  message: string;
}

export interface AppConfig {
  center: string;
  code: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  faxNumber: string;
  email: string;
  url: string;
  headMaster: string;
  defaultCourse: Course;
}

export interface Course {
  id: string;
  course: string;
  denomination: string;
}

export interface Config {
  map: string;
}

export interface Permissions {
  [index: string]: Actions[];
}

export interface KeyValue {
  [key: string]: string | KeyValue | number;
}

export interface ObjectPair {
  [k: string]: string;
}

export interface MongoError {
  driver?: boolean;
  name: string;
  index?: number;
  code: number | string;
  keyPattern?: KeyValue;
  keyValue: KeyValue;
  message?: string;
}

export interface AppError {
  name: string;
  response: ErrorResponse;
  status: HttpStatus;
}

export interface ErrorResponse {
  statusCode: HttpStatus;
  message: string | string[];
  error: string | KeyValue | number;
}

type AccessKeys = 'isPublic' | 'allow' | 'deny';

export type AccessValues = {
  [K in AccessKeys]?: boolean | Role[];
};

export type ApiOptions = [Controls, CRUD, AccessValues?];
