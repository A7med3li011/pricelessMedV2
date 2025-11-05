"use client";

import { getAccessToken } from "@/src/app/actions/auth";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  token: string | null;
}

interface AuthContextType extends AuthState {
  updateAuthState: (isAuth: boolean, token?: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  isLoading: true,
  token: null,
  updateAuthState: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuth: false,
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getAccessToken();
        setAuthState({
          isAuth: !!token,
          isLoading: false,
          token,
        });
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthState({
          isAuth: false,
          isLoading: false,
          token: null,
        });
      }
    };

    initializeAuth();
  }, []);

  const updateAuthState = (isAuth: boolean, token: string | null = null) => {
    setAuthState({
      isAuth,
      isLoading: false,
      token,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
