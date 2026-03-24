import { useCallback, useEffect, useState } from "react";
import {
  clearSession,
  getSession,
  saveSession,
  saveUser,
} from "../features/auth/authStorage";
import type { Session } from "../features/auth/authStorage";

export interface AuthResult {
  success: boolean;
  error?: string;
}

// A guest session used when bypassing credential validation
const GUEST_SESSION: Session = {
  userId: "guest",
  name: "User",
  email: "",
};

export function useAuth() {
  const [user, setUser] = useState<Session | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const session = getSession();
    setUser(session);
    setIsLoaded(true);
  }, []);

  // loginDirect: bypasses credential validation, sets a session immediately
  const loginDirect = useCallback(() => {
    saveSession({
      id: GUEST_SESSION.userId,
      name: GUEST_SESSION.name,
      email: GUEST_SESSION.email,
      password: "",
    });
    setUser(GUEST_SESSION);
  }, []);

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string,
    ): Promise<AuthResult> => {
      const result = saveUser(name, email, password);
      return result;
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoaded,
    loginDirect,
    signup,
    logout,
  };
}
