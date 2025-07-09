import React, { useEffect, useState } from "react";

import { AuthCasesFactory } from "@presenters/auth.factory";

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  authLoading: boolean;
  cleanToken: () => void;
}

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  authLoading: false,
  cleanToken: () => {},
});

const useCases = AuthCasesFactory.authCases();

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setAuthLoading(true);
      try {
        const token = await useCases.getToken.execute();
        setToken(token);
        if (token) {
          useCases.setApiHeaders.execute(token);
          useCases.setSocketHeaders.execute(token);
        }
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setAuthLoading(false);
      }
    };
    checkToken();
  }, []);

  const cleanToken = () => {
    useCases.clearToken.execute();
    setToken(null);
  };

  const handleSetToken = (token: string) => {
    useCases.storeToken.execute(token);
    useCases.setApiHeaders.execute(token);
    useCases.setSocketHeaders.execute(token);
    setToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: handleSetToken,
        authLoading,
        cleanToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
