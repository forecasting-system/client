import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { LoginUseCase } from "@domain/login/useCases/login.usecase";
import { AuthContext } from "@context/authContext";

interface LoginUseCases {
  login: LoginUseCase;
}

export function useLoginPresenter(useCases: LoginUseCases): {
  isLoading: boolean;
  onLogin: () => Promise<void>;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
} {
  const { token, setToken, cleanToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  async function onLogin() {
    setIsLoading(true);
    try {
      const login = await useCases.login.execute({
        email,
        password,
      });

      if (login) {
        setToken(login.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      cleanToken();
      setEmail("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    onLogin,
    password,
    setPassword,
    email,
    setEmail,
  };
}
