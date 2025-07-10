import { vitest } from "vitest";

import {
  type CredentialsProps,
  type LoginRepository,
} from "@domain/login/repositories/login-repository";
import { Login, type LoginProps } from "@domain/login/entities/login";
import { LoginUseCase } from "@domain/login/useCases/login.usecase";

describe("LoginUseCase", () => {
  it("should return a login", async () => {
    // Arrange
    const credentials: CredentialsProps = {
      email: "user",
      password: "password",
    };

    const loginProps: LoginProps = {
      user: "user",
      token: "token",
    };

    const login = Login.create(loginProps);

    // @ts-expect-error: tests errors
    const LoginRepository: LoginRepository = {
      loginService: vitest.fn().mockResolvedValue(login),
    };

    const useCase = new LoginUseCase(LoginRepository);

    // Act
    const result = await useCase.execute(credentials);

    // Assert
    expect(result).toBe(login);
  });
});
