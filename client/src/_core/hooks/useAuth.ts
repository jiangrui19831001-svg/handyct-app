import { useCallback, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  // Pure frontend version - no authentication
  // For a public blog/tool, users don't need to authenticate
  
  const state = useMemo(() => {
    return {
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,
    };
  }, []);

  const logout = useCallback(async () => {
    // No-op for pure frontend
  }, []);

  return {
    ...state,
    refresh: () => Promise.resolve(),
    logout,
  };
}
