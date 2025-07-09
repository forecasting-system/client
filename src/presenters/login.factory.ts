import { LoginUseCase } from "@domain/login/useCases/login.usecase";
import { LoginMemoryRepository } from "@data/login/login-memory.repository";

export class LoginFactory {
  static provideLoginCases() {
    const userServiceMemoryRepository = new LoginMemoryRepository();

    return {
      login: new LoginUseCase(userServiceMemoryRepository),
    };
  }
}
