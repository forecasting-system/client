import {
  TokenClearUseCase,
  TokenGetUseCase,
  TokenSetApiHeadersUseCase,
  TokenSetSocketHeadersUseCase,
  TokenStoreUseCase,
} from "@domain/login/useCases/tokenStore.usecase";
import { LoginMemoryRepository } from "@data/login/login-memory.repository";

export class AuthCasesFactory {
  static authCases() {
    const userServiceMemoryRepository = new LoginMemoryRepository();

    const tokenStoreUseCase = new TokenStoreUseCase(
      userServiceMemoryRepository
    );
    const tokenClearUseCase = new TokenClearUseCase(
      userServiceMemoryRepository
    );
    const tokenGetUseCase = new TokenGetUseCase(userServiceMemoryRepository);
    const tokenSetApiHeadersUseCase = new TokenSetApiHeadersUseCase(
      userServiceMemoryRepository
    );
    const tokenSetSocketHeadersUseCase = new TokenSetSocketHeadersUseCase(
      userServiceMemoryRepository
    );
    return {
      storeToken: tokenStoreUseCase,
      clearToken: tokenClearUseCase,
      getToken: tokenGetUseCase,
      setApiHeaders: tokenSetApiHeadersUseCase,
      setSocketHeaders: tokenSetSocketHeadersUseCase,
    };
  }
}
