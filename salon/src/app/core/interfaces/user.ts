import { IBase } from './base';

export interface IUser extends IBase {
  tel: string;
  email: string;
  username: string;
  password: string;
}
