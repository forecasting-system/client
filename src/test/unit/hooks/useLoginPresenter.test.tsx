import React, { act } from "react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { renderHook } from "@testing-library/react";

import type { LoginUseCase } from "@domain/login/useCases/login.usecase";
import { AuthContext } from "@context/authContext";
import { useLoginPresenter } from "@presenters/useLoginPresenter";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("useLoginPresenter", () => {
  // @ts-expect-error: tests errors
  const mockLogin: LoginUseCase = {
    execute: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call login use case and navigate on success", async () => {
    const fakeToken = "abc123";
    const setToken = vi.fn();

    (mockLogin.execute as any).mockResolvedValueOnce({ token: fakeToken });

    const wrapperWithCustomContext = ({
      children,
    }: {
      children: React.ReactNode;
    }) => (
      <AuthContext.Provider
        value={{
          token: null,
          setToken,
          authLoading: false,
          cleanToken: vi.fn(),
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </AuthContext.Provider>
    );

    const { result } = renderHook(
      () => useLoginPresenter({ login: mockLogin }),
      { wrapper: wrapperWithCustomContext }
    );

    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("password");
    });

    await act(async () => {
      result.current.onLogin();
    });

    expect(mockLogin.execute).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
    });
    expect(setToken).toHaveBeenCalledWith(fakeToken);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should reset state on login failure", async () => {
    const setToken = vi.fn();
    const cleanToken = vi.fn();

    (mockLogin.execute as any).mockRejectedValueOnce(new Error("Login failed"));

    const wrapperWithCustomContext = ({
      children,
    }: {
      children: React.ReactNode;
    }) => (
      <AuthContext.Provider
        value={{
          token: null,
          setToken,
          authLoading: false,
          cleanToken,
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </AuthContext.Provider>
    );

    const { result } = renderHook(
      () => useLoginPresenter({ login: mockLogin }),
      { wrapper: wrapperWithCustomContext }
    );

    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("password");
    });

    await act(async () => {
      result.current.onLogin();
    });

    expect(cleanToken).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });
});
