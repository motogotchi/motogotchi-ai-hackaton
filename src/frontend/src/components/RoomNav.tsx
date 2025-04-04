import cn from "classnames";
import { RoomType } from "src/types";

// Room nav
const RoomNav = ({
  rooms,
  currentRoom,
  setRoom,
}: {
  rooms: RoomType[];
  currentRoom: RoomType["label"];
  setRoom: (roomLabel: RoomType["label"]) => void;
}) => {
  return (
    <div className="flex gap-3 p-6 pt-0">
      {rooms.map((room) => (
        <button
          key={room.label}
          onClick={() => setRoom(room.label)}
          className={cn(
            "border-t-2 border-white/40 flex items-center justify-center gap-2 bg-linear-210 transition hover:scale-105 shadow-lg py-3 px-5 rounded-lg flex-1 inset-ring-4 inset-ring-white/20 active:translate-y-px cursor-pointer",
            {
              "from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600":
                room.label !== currentRoom,
            },
            {
              "from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500":
                room.label === currentRoom,
            }
          )}
        >
          <room.icon className="w-6 h-6 text-white/80" />
          <span className="font-medium tracking-wide  text-lg">
            {room.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default RoomNav;
