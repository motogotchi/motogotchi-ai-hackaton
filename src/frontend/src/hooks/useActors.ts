import { useContext } from "react";
import { ActorContext } from "../context/ActorContext";

// Actor context hook
export const useActors = () => {
  const context = useContext(ActorContext);
  if (context === undefined) {
    throw new Error("useActors must be used within an ActorProvider");
  }
  return context;
};
