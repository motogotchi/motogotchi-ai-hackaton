import { Loader } from "lucide-react"; // Import a loader icon
import { useAuth } from "../hooks/useAuth";

// Log in component
const Login = () => {
  const { login, isLoading } = useAuth();

  return (
    // Main container: Full width, flexbox, center items vertically and horizontally
    <div className="w-full flex items-center justify-center h-full">
      {/* Login Card: Centered, styled container */}
      <div className="bg-black/30 backdrop-blur-lg p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/10 max-w-lg w-full flex flex-col items-center gap-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/30">
        {/* Game Character Image */}
        <img
          src="/motogotchi.webp" // Assuming image is in public folder
          alt="Motogotchi Character"
          className="h-48 w-auto drop-shadow-xl mb-4 transition-transform duration-300 group-hover:scale-105" // Add hover effect if card had group class
        />

        {/* Title */}
        <h1 className="text-4xl font-bold font-clash text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400">
          Welcome to Motogotchi!
        </h1>

        {/* Description */}
        <p className="text-center text-indigo-200 text-lg px-4">
          Connect your Internet Identity to begin your virtual pet adventure.
        </p>

        {/* Login Button Area */}
        <div className="w-full mt-4">
          <button
            onClick={login}
            disabled={isLoading}
            className={`
              w-full flex items-center justify-center gap-3 cursor-pointer rounded-lg
              px-6 py-3.5 font-clash font-semibold text-lg text-white shadow-lg
              bg-gradient-to-r from-indigo-600 to-violet-700
              hover:from-indigo-500 hover:to-violet-600
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
              active:translate-y-px
              transition-all duration-150 ease-in-out
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-violet-700 disabled:active:translate-y-0
            `}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                <span>Connecting...</span>
              </>
            ) : (
              "Login with Internet Identity"
            )}
          </button>
        </div>

        {/* Optional: Add a subtle footer or link if needed */}
        {/* <p className="text-xs text-gray-500 mt-6">Powered by the Internet Computer</p> */}
      </div>
    </div>
  );
};

export default Login;
