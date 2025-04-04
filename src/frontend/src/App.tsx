import { useState, useEffect } from "react";
import {
  ActorSubclass as AS,
  HttpAgent,
  Actor,
  AnonymousIdentity,
} from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

import { idlFactory as mainIDL } from "declarations/main";
import { idlFactory as userIDL } from "declarations/user";
import { _SERVICE as MainService } from "declarations/main/main.did.d";
import { _SERVICE as UserService } from "declarations/user/user.did.d";

import Game from "./Game";
import Login from "./Login";

// Constants
const isLocal = process.env.DFX_NETWORK === "local";
const host = isLocal ? "http://localhost:4943" : "https://icp-api.io";
const identityProvider = isLocal
  ? "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943"
  : "https://identity.ic0.app";
const mainCanisterId = process.env.CANISTER_ID;

// Main application
const App = () => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [httpAgent, setHttpAgent] = useState<HttpAgent | null>(null);
  const [mainActor, setMainActor] = useState<AS<MainService> | null>(null);
  const [userActor, setUserActor] = useState<AS<UserService> | null>(null);
  const [userInfo, setUserInfo] = useState<string | null>(null);

  // Initialize app
  useEffect(() => {
    async function initApp() {
      // Create auth client
      const newAuthClient = await AuthClient.create();
      setAuthClient(newAuthClient);
      console.log("Auth client created");

      // Create http agent
      const identity = newAuthClient.getIdentity();
      const newHttpAgent = await HttpAgent.create({ host, identity });
      if (isLocal) await newHttpAgent.fetchRootKey();
      setHttpAgent(newHttpAgent);
      console.log("Http agent created");

      // Create main actor
      const newMainActor: AS<MainService> = await Actor.createActor(mainIDL, {
        agent: newHttpAgent,
        canisterId: mainCanisterId!,
      });
      setMainActor(newMainActor);
      console.log("Main actor created");
    }
    initApp();
  }, []);

  // Initialize auth
  useEffect(() => {
    async function handleAuthState() {
      if (await authClient?.isAuthenticated()) {
        console.log("Authenticated");

        // Get user canister
        const userId = authClient?.getIdentity().getPrincipal();
        const fetchedUserCanisterIdArray: [Principal] =
          await mainActor?.getUserCanister(userId);
        const fetchedUserCanisterId = fetchedUserCanisterIdArray[0];

        // Create user actor
        if (fetchedUserCanisterId instanceof Principal) {
          const newUserActor: AS<UserService> = Actor.createActor(userIDL, {
            agent: httpAgent!,
            canisterId: fetchedUserCanisterId,
          });
          setUserActor(newUserActor);
        }
        // If not - create a new canister, save it to accounts and create an actor
      } else {
        console.log("Not authenticated");
      }
    }
    handleAuthState();
  }, [mainActor]);

  // Login
  const login = async () => {
    await authClient?.login({
      identityProvider,
      onSuccess: () => {},
    });
  };

  // Log out
  const logout = async () => {
    await authClient?.logout();
    setUserActor(null);
  };

  return (
    <div className="p-10 h-dvh flex font-clash bg-radial/oklch from-indigo-900 to-indigo-950">
      {authClient?.getIdentity() instanceof AnonymousIdentity ? (
        <Login login={login} />
      ) : (
        <Game
          authClient={authClient}
          httpAgent={httpAgent}
          mainActor={mainActor}
          userActor={userActor}
          logout={logout}
        />
      )}
    </div>
  );
};

export default App;
