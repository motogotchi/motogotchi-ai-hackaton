// Log in
const Login = ({ login }: { login: () => {} }) => {
  return (
    <div className="w-full flex">
      <button
        onClick={login}
        className="cursor-pointer m-auto rounded-md bg-indigo-600 px-3 py-2 font-clash font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Login with Internet Identity
      </button>
    </div>
  );
};

export default Login;
