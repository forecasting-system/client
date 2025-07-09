import type { LoginRepository } from "@domain/login/repositories/login-repository";

export class TokenStoreUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  public async execute(token: string): Promise<void> {
    return this.loginRepository.storeToken(token);
  }
}

export class TokenClearUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  public async execute(): Promise<void> {
    this.loginRepository.setApiHeaders("");
    this.loginRepository.setSocketHeaders("");
    return this.loginRepository.clearToken();
  }
}

export class TokenGetUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  public async execute(): Promise<string | null> {
    return this.loginRepository.getToken();
  }
}

export class TokenSetApiHeadersUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  public async execute(token: string): Promise<void> {
    return this.loginRepository.setApiHeaders(token);
  }
}

export class TokenSetSocketHeadersUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  public async execute(token: string): Promise<void> {
    return this.loginRepository.setSocketHeaders(token);
  }
}
