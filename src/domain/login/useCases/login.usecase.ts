import type { Login } from "@domain/login/entities/login";
import type {
  CredentialsProps,
  LoginRepository,
} from "@domain/login/repositories/login-repository";

export class LoginUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  public async execute(credentials: CredentialsProps): Promise<Login> {
    return this.loginRepository.loginService(credentials);
  }
}
