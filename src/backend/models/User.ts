export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
