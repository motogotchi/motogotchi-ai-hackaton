import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { ActorSubclass, HttpAgent, Actor } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { useAuth } from "../hooks/useAuth";

import { idlFactory as mainIDL } from "declarations/main";
import { idlFactory as userIDL } from "declarations/user";
import { _SERVICE as MainService } from "declarations/main/main.did.d";
import { _SERVICE as UserService } from "declarations/user/user.did.d";

// Constants
const isLocal = process.env.DFX_NETWORK === "local";
const host = isLocal ? "http://localhost:4943" : "https://icp-api.io";
const mainCanisterId = process.env.CANISTER_ID_MAIN;

interface ActorContextType {
  httpAgent: HttpAgent | null;
  mainActor: ActorSubclass<MainService> | null;
  userActor: ActorSubclass<UserService> | null;
  isLoading: boolean;
}

export const ActorContext = createContext<ActorContextType | undefined>(
  undefined
);

interface ActorProviderProps {
  children: ReactNode;
}

export const ActorProvider: React.FC<ActorProviderProps> = ({ children }) => {
  const { identity, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [httpAgent, setHttpAgent] = useState<HttpAgent | null>(null);
  const [mainActor, setMainActor] = useState<ActorSubclass<MainService> | null>(
    null
  );
  const [userActor, setUserActor] = useState<ActorSubclass<UserService> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Memoize agent creation based on identity
  const agent = useMemo(() => {
    if (!identity) return null; // No identity, no agent
    console.log("Creating HttpAgent for host:", host);
    const agent = new HttpAgent({ host, identity });
    if (isLocal) {
      agent.fetchRootKey().catch((err) => {
        console.warn(
          "Unable to fetch root key. Check to ensure that your local replica is running"
        );
        console.error(err);
      });
    }
    return agent;
  }, [identity]); // Recreate agent only if identity changes

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated || !agent) {
      // Wait for auth check and authentication, and agent creation
      if (!isAuthLoading && !isAuthenticated) {
        // If we know user is not authenticated, clear actors and stop loading
        setMainActor(null);
        setUserActor(null);
        setHttpAgent(null);
        setIsLoading(false);
      } else if (!isAuthLoading && isAuthenticated && !agent) {
        setIsLoading(true);
      } else {
        setIsLoading(true);
      }
      return;
    }

    setIsLoading(true);
    setHttpAgent(agent);

    console.log("Creating main actor for canister:", mainCanisterId);
    const newMainActor = Actor.createActor<MainService>(mainIDL, {
      agent,
      canisterId: mainCanisterId!,
    });
    setMainActor(newMainActor);
    console.log("Main actor created");

    const principal = identity?.getPrincipal();
    if (!principal) {
      console.error("Principal not found on identity");
      setIsLoading(false);
      return;
    }

    console.log("Fetching user canister for principal:", principal.toText());
    newMainActor
      .getUserCanister(principal)
      .then(async (canisterIdOpt: [] | [Principal]) => {
        let userCanisterId: Principal | null = null;

        if (
          canisterIdOpt &&
          canisterIdOpt.length > 0 &&
          canisterIdOpt[0] instanceof Principal
        ) {
          userCanisterId = canisterIdOpt[0];
          console.log("Found existing user canister:", userCanisterId.toText());
        } else {
          console.log("User canister not found, creating new one...");
          try {
            userCanisterId = await newMainActor.createAccount(principal);
            console.log("Created new user canister:", userCanisterId!.toText());
          } catch (error) {
            console.error("Failed to create user account:", error);
            setIsLoading(false);
            return;
          }
        }

        if (userCanisterId) {
          console.log(
            "Creating user actor for canister:",
            userCanisterId.toText()
          );
          const newUserActor = Actor.createActor<UserService>(userIDL, {
            agent,
            canisterId: userCanisterId,
          });
          setUserActor(newUserActor);
          console.log("User actor created");
        } else {
          console.error("Failed to obtain user canister ID");
        }
      })
      .catch((error: Error) => {
        console.error("Error fetching or creating user canister:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [agent, isAuthenticated, isAuthLoading, identity]);

  const value = {
    httpAgent,
    mainActor,
    userActor,
    isLoading,
  };

  return (
    <ActorContext.Provider value={value}>{children}</ActorContext.Provider>
  );
};
