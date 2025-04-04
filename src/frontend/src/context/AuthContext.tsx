import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

// Constants (consider moving to a config file)
const isLocal = process.env.DFX_NETWORK === "local";
const identityProvider = isLocal
  ? "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943"
  : "https://identity.ic0.app";

interface AuthContextType {
  authClient: AuthClient | null;
  isAuthenticated: boolean;
  identity: Identity | null;
  principal: Principal | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean; // Added loading state
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start loading

  // Initialize AuthClient
  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const authenticated = await client.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        const id = client.getIdentity();
        setIdentity(id);
        setPrincipal(id.getPrincipal());
      }
      setIsLoading(false); // Finished initial check
    });
  }, []);

  const login = useCallback(async () => {
    if (!authClient) return;
    setIsLoading(true);

    await authClient.login({
      identityProvider,
      onSuccess: async () => {
        const authenticated = await authClient.isAuthenticated();
        setIsAuthenticated(authenticated);
        if (authenticated) {
          const id = authClient.getIdentity();
          setIdentity(id);
          setPrincipal(id.getPrincipal());
        }
        setIsLoading(false);
      },
      onError: (err) => {
        console.error("Login failed:", err);
        setIsLoading(false);
      },
    });
  }, [authClient]);

  const logout = useCallback(async () => {
    if (!authClient) return;
    setIsLoading(true);
    await authClient.logout();
    setIsAuthenticated(false);
    setIdentity(null);
    setPrincipal(null);
    setIsLoading(false);
  }, [authClient]);

  const value = {
    authClient,
    isAuthenticated,
    identity,
    principal,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
