import { Permissions } from '@iz/interface';
import { Role, Gender, BloodGroup, Standard } from '@iz/enum';

export interface Phone {
  home?: number;
  office?: number;
  mobile: number;
  preferred: 'home' | 'office' | 'mobile';
}

export interface Address {
  preferred: boolean;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: number;
}

export interface Contact {
  CurrentAddress: Address;
  permanentAddress: Address | boolean;
  phone: Phone;
  emailId: string;
}

export interface User {
  userName: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  role: Role;
  permissions?: Permissions;
  passwordHash?: string;
  password?: string;
  confirmPassword?: string;
}

export type Login = Required<Pick<User, 'userName' | 'password'>>;
export type Register = Required<
  Pick<User, 'userName' | 'password' | 'confirmPassword' | 'role'>
>;

export interface BaseUser extends User, Contact {
  doj: Date;
  dob: Date;
  gender: Gender;
  bloodGroup?: BloodGroup;
  caste?: string;
  religion?: string;
  class?: string;
  language?: string;
  Nationality?: string;
}

export interface Student extends BaseUser {
  rollNo: number;
  standard: Standard;
  section: string;
  parent: Parent[];
}

export interface Teacher extends BaseUser {
  qualification: string;
  salary: number;
}

export interface Parent extends User, Contact {
  relation: 'father' | 'mother' | 'guardian';
  gender: Gender;
  occupation: string;
}

export interface GeneralUser extends User, Contact {
  doj: Date;
  dob: Date;
  gender: Gender;
  bloodGroup?: BloodGroup;
  language?: string;
  Nationality?: string;
}

export interface AuthResponse {
  token: string;
}

export interface JwtPayload {
  userName: string;
  role: Role;
}
