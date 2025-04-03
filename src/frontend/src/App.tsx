import { useState, useEffect } from "react";
import { ActorSubclass, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

import { canisterId, createActor, idlFactory } from "declarations/main";
import { _SERVICE } from "declarations/main/main.did.d";

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === "ic"
    ? "https://identity.ic0.app"
    : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943";

const App = () => {
  const [mainActor, setMainActor] = useState<ActorSubclass<_SERVICE> | null>(
    null
  );
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("Principal..");
  const [message, setMessage] = useState("");

  // Initialize auth
  useEffect(() => {
    updateAuth();
  }, []);

  // Update auth
  const updateAuth = async () => {
    const newAuthClient = await AuthClient.create();
    const newIdentity = newAuthClient.getIdentity();

    const agent = await HttpAgent.create({
      host: "http://localhost:4943",
      identity: newIdentity,
    });

    // For local dev
    if (network !== "ic") {
      await agent.fetchRootKey();
    }

    const newPrincipal = newIdentity.getPrincipal().toString();
    const newMainActor = createActor(canisterId, { agent });
    const isClientAuthenticated = await newAuthClient.isAuthenticated();

    setAuthClient(newAuthClient);
    setPrincipal(newPrincipal);
    setMainActor(newMainActor);
    setIsAuthenticated(isClientAuthenticated);
  };

  const getCanisterActor = () => {};

  // Login
  const login = async () => {
    await authClient?.login({
      identityProvider,
      onSuccess: updateAuth,
    });
  };

  // Log out
  const logout = async () => {
    await authClient?.logout();
    updateAuth();
  };

  /////////////
  // Testing //
  /////////////

  const [formUserPrincipal, setFormUserPrincipal] = useState("");

  // Get all accounts
  const getAllAccounts = async () => {
    setMessage("Loading...");
    const accounts = await mainActor?.getAllAccounts();
    setMessage(accounts.toString());
  };

  // Get account
  const getAccount = async (userPrincipal: string) => {
    setMessage("Loading...");
    const account = await mainActor?.getAccount(
      Principal.fromText(userPrincipal)
    );
    setMessage(account.toString());
  };

  // Create account
  const createAccount = async (userPrincipal: string) => {
    setMessage("Loading...");
    const account = await mainActor?.createAccount(
      Principal.fromText(userPrincipal)
    );
    setMessage(account.toString());
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      <div>
        {!isAuthenticated ? (
          <button
            onClick={login}
            className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login with Internet Identity
          </button>
        ) : (
          <button
            onClick={logout}
            className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Logout
          </button>
        )}
      </div>

      <div>
        <span>Your principal: </span>
        <span>{principal}</span>
      </div>

      <div>
        <button
          onClick={getAllAccounts}
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get all accounts
        </button>
      </div>

      <div>
        <div className="relative mb-4">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            User principal
          </label>
          <input
            id="user-principal"
            name="user-principal"
            type="text"
            placeholder="User principal"
            defaultValue={formUserPrincipal}
            onChange={(e) => setFormUserPrincipal(e.target.value)}
            className="block w-lg rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => createAccount(formUserPrincipal)}
            className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create new account
          </button>

          <button
            onClick={() => getAccount(formUserPrincipal)}
            className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get account
          </button>
        </div>
      </div>

      <div className="p-4 rounded bg-gray-300 text-xs overflow-scroll">
        <pre>
          {JSON.stringify(
            {
              message,
              principal,
              isAuthenticated,
              authClient,
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
