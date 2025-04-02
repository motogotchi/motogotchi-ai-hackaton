import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";

import { createActor } from "declarations/main";
import { canisterId } from "declarations/main/index.js";

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === "ic"
    ? "https://identity.ic0.app"
    : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943";

const App = () => {
  const [actor, setActor] = useState(undefined);
  const [authClient, setAuthClient] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState('Click "whoami"..');

  // Initialize actor
  useEffect(() => {
    updateActor();
  }, []);

  const updateActor = async () => {
    const newAuthClient = await AuthClient.create();
    const newIdentity = newAuthClient.getIdentity();
    const newPrincipal = newIdentity.getPrincipal().toString();
    const actorOptions = { agentOptions: { identity: newIdentity } };
    const newActor = createActor(canisterId, actorOptions);
    const isClientAuthenticated = await newAuthClient.isAuthenticated();

    setAuthClient(newAuthClient);
    setPrincipal(newPrincipal);
    setActor(newActor);
    setIsAuthenticated(isClientAuthenticated);
  };

  const login = async () => {
    await authClient.login({
      identityProvider,
      onSuccess: updateActor,
    });
  };

  const logout = async () => {
    await authClient.logout();
    updateActor();
  };

  const whoami = async () => {
    setPrincipal("Loading...");
    const actorPrincipal = await actor.whoami();
    setPrincipal(actorPrincipal.toString());
  };

  return (
    <div>
      <div>Who Am I?</div>

      {!isAuthenticated ? (
        <button onClick={login}>Login with Internet Identity</button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      <button onClick={whoami}>Whoami</button>

      {principal && (
        <div>
          <div>Your principal ID is:</div>
          <div>{principal}</div>
        </div>
      )}
    </div>
  );
};

export default App;
