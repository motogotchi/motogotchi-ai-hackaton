import { useAuth } from "../hooks/useAuth";

// Log in component
const Login = () => {
  const { login, isLoading } = useAuth();

  return (
    <div className="w-full flex">
      <button
        onClick={login}
        disabled={isLoading}
        className="cursor-pointer m-auto rounded-md bg-indigo-600 px-4 py-2.5 font-clash font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Logging in..." : "Login with Internet Identity"}
      </button>
    </div>
  );
};

export default Login;
