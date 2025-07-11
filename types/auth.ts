export type AuthRole = 'listener' | 'artist' | 'admin';

export interface AuthPayload {
  token: string;
  user: {
    id: string;
    email: string;
    role: AuthRole;
    name: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role: AuthRole;
}