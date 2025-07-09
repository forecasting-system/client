import type { Login } from "@domain/login/entities/login";

export interface CredentialsProps {
  email: string;
  password: string;
}

export interface LoginRepository {
  loginService(credentials: CredentialsProps): Promise<Login>;
  storeToken(token: string): void;
  getToken(): string | null;
  clearToken(): void;
  setApiHeaders(token: string): void;
  setSocketHeaders(token: string): void;
}
