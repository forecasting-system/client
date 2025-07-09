import { Login } from "@domain/login/entities/login";
import type {
  CredentialsProps,
  LoginRepository,
} from "@domain/login/repositories/login-repository";
import api from "@data/api";
import type { LoginApiResponse } from "./login-memory.interface.repository";
import { CONSTANTS } from "@constants/external";
import { setApiToken } from "@data/api";
import { setSocketToken } from "@data/socket";

export class LoginMemoryRepository implements LoginRepository {
  public async loginService(credentials: CredentialsProps): Promise<Login> {
    const response = await api.post<LoginApiResponse>(
      `${CONSTANTS.DASHBOARD_BACKEND}${CONSTANTS.LOGIN_ENDPOINT}`,
      credentials
    );

    const { user, token } = response.data;

    const login = new Login({ user: user.username, token });

    return login;
  }

  public setApiHeaders(token: string): void {
    setApiToken(token);
  }

  public setSocketHeaders(token: string): void {
    setSocketToken(token);
  }

  public storeToken(token: string): void {
    localStorage.setItem("token", token);
  }

  public getToken(): string | null {
    return localStorage.getItem("token");
  }

  public clearToken(): void {
    localStorage.removeItem("token");
  }
}
