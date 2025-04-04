import Loading from "./components/Loading";
import { useAuth } from "./hooks/useAuth";
import Game from "./pages/Game";
import Login from "./pages/Login";

// Main application component
const App = () => {
  const { isAuthenticated, isLoading: isAuthLoading, logout } = useAuth();

  // Checking auth state
  if (isAuthLoading) {
    return (
      <div className="p-10 h-dvh flex font-clash bg-radial/oklch from-indigo-900 to-indigo-950">
        <Loading message="Initializing..." />
      </div>
    );
  }

  return (
    <div className="p-10 h-dvh flex font-clash bg-radial/oklch from-indigo-900 to-indigo-950">
      {isAuthenticated ? <Game logout={logout} /> : <Login />}
    </div>
  );
};

export default App;
