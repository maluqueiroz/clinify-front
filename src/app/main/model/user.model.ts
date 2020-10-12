export interface UserDTO {
    username: string;
    email: string;
    password: string;
    active: boolean;
    created_on: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  active: boolean;
  created_on: Date;
}
