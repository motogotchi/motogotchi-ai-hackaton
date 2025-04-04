import { RoomActionType } from "src/types";

// Character actions
const RoomActions = ({ actions }: { actions: RoomActionType[] }) => {
  return (
    <div className="flex flex-col gap-4 border-t-2 border-gray-400/80 bg-gray-900/60 backdrop-blur-lg rounded-2xl inset-ring-4 inset-ring-white/30 -ml-8 w-24 p-4">
      {actions.map((action) => (
        <div
          key={action.label}
          className="flex items-center justify-center bg-linear-to-bl from-violet-600 to-fuchsia-600 transition hover:from-violet-500 hover:to-fuchsia-500 hover:scale-110 hover:rotate-3 shadow-lg p-3 rounded-lg inset-ring-white/20 inset-ring-4 aspect-square cursor-pointer active:translate-y-px"
        >
          <action.icon className="w-8 h-8 text-white" />
        </div>
      ))}
    </div>
  );
};

export default RoomActions;
