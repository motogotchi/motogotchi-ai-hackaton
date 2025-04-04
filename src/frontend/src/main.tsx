import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { ActorProvider } from "./context/ActorContext"; // Import ActorProvider
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ActorProvider>
        <App />
      </ActorProvider>
    </AuthProvider>
  </StrictMode>
);
