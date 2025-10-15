export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  school?: string;
  subject?: string;
  segment?: string;
  city?: string;
  state?: string;
  bio?: string;
  verified: boolean;
  createdAt: Date;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  school?: string;
  subject?: string;
  segment?: string;
  city?: string;
  state?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: Omit<User, 'passwordHash'>;
}

export interface JWTPayload {
  userId: string;
  email: string;
}
