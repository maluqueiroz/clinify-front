import { PermissionsEnum } from './permissions.enum';

export interface UserDTO {
    username: string;
    email: string;
    password: string;
    active: boolean;
    permission: PermissionsEnum;
    createdOn: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  active: boolean;
  permission: PermissionsEnum;
  createdOn: Date;
}
