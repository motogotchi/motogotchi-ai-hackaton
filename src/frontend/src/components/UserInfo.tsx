import { UserInfoType } from "../types";

// User info props
interface UserInfoProps {
  userInfo: UserInfoType | null; // Can be null initially or on error
  userId: string;
  logout: () => void; // Changed from {} to void for clarity
  isLoading: boolean; // Receive loading state
}

// User info component
const UserInfo = ({ userInfo, userId, logout, isLoading }: UserInfoProps) => {
  const displayInfo = userInfo ?? {
    name: "...",
    height: "-",
    weight: "-",
    goals: "...",
  };

  return (
    <div className="shadow-lg border-t-2 border-gray-400/80 -mt-8 -mr-8 flex flex-col gap-3 bg-gray-900/60 backdrop-blur-lg rounded-2xl inset-ring-4 inset-ring-white/30 p-6 relative">
      {" "}
      {/* Added relative for potential spinner */}
      {/* Optional: Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center rounded-2xl z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      )}
      {/* User header */}
      <div className="flex gap-4 items-center w-full">
        {/* Avatar */}
        <div className="flex rounded-lg bg-linear-240 from-gray-500 to-gray-600 inset-ring-4 inset-ring-white/20 w-10 h-10">
          {/* Placeholder initials - could make dynamic */}
          <div className="m-auto font-semibold">
            {displayInfo.name &&
            displayInfo.name !== "Loading..." &&
            displayInfo.name !== "..."
              ? displayInfo.name.substring(0, 2).toUpperCase()
              : "??"}
          </div>
        </div>

        {/* Name */}
        <div className="flex-1 overflow-hidden">
          <div
            className="font-medium text-lg leading-none truncate"
            title={displayInfo.name}
          >
            {displayInfo.name}
          </div>
          <div
            title={userId}
            className="text-gray-500 overflow-ellipsis whitespace-nowrap overflow-hidden"
          >
            {userId}
          </div>
        </div>

        {/* Log out */}
        <button
          onClick={logout}
          className="cursor-pointer transition-colors font-medium bg-gray-700 rounded-lg py-2 px-3 hover:bg-gray-600 active:translate-y-px inset-ring-4 inset-ring-white/15"
        >
          Log out
        </button>
      </div>
      {/* Light box */}
      <div className="bg-gray-700/60 text-sm rounded-lg py-2.5 px-3.5 border-t border-gray-700 shadow-lg">
        {/* Info */}
        <div className="text-gray-300 flex">
          <div className="font-medium text-gray-400 w-14 shrink-0">Info</div>
          <div className="tracking-wide flex gap-2">
            <span>{displayInfo.height}</span>
            <span className="text-gray-400 font-semibold">·</span>
            <span>{displayInfo.weight}</span>
          </div>
        </div>

        <div className="h-px bg-white/10 my-1.5"></div>

        {/* Goals */}
        <div className="text-gray-300 flex">
          <div className="font-medium text-gray-400 w-14 shrink-0">Goals</div>
          <div className="tracking-wide leading-tight mt-0.5">
            {displayInfo.goals}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
