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

      // Create http agent
      const identity = newAuthClient.getIdentity();
      const newHttpAgent = await HttpAgent.create({ host, identity });
      if (isLocal) await newHttpAgent.fetchRootKey();
      setHttpAgent(newHttpAgent);

      // Create main actor
      const newMainActor: AS<MainService> = await Actor.createActor(mainIDL, {
        agent: newHttpAgent,
        canisterId: mainCanisterId!,
      });
      setMainActor(newMainActor);
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

  // Create account
  const createAccount = async () => {
    await mainActor?.createAccount(authClient?.getIdentity().getPrincipal());
  };

  // Get user info
  const getUserInfo = async () => {
    const info = await userActor?.getInfo();
    setUserInfo(info);
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      <div>
        <div className="flex gap-4">
          {authClient?.getIdentity() instanceof AnonymousIdentity ? (
            <button
              onClick={login}
              className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login with Internet Identity
            </button>
          ) : (
            <>
              {!userActor ? (
                <button
                  onClick={createAccount}
                  className="rounded bg-green-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Create an account
                </button>
              ) : (
                <button
                  onClick={getUserInfo}
                  className="rounded bg-green-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Get user info
                </button>
              )}

              <button
                onClick={logout}
                className="rounded bg-gray-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-4 rounded bg-gray-300 text-xs overflow-scroll">
        <pre>
          {JSON.stringify(
            {
              userId: authClient?.getIdentity().getPrincipal().toString(),
              userInfo,
              mainActor,
              userActor,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

export default App;
