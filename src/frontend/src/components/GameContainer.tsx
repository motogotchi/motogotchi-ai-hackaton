import { PropsWithChildren, FC } from "react";

const GameContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="m-auto w-full max-w-5xl relative border-[20px] border-black/40 rounded-4xl">
      {/* Bg Glow */}
      <div className="absolute inset-0 bg-indigo-700/30 blur-xl scale-105 -rotate-3"></div>

      {/* Room Bg Img */}
      <div className="relative flex w-full rounded-2xl shadow-2xl bg-[url(/public/room-bg.webp)] bg-no-repeat bg-center bg-cover inset-ring-4 inset-ring-white/10">
        {/* Linear overlay 1 */}
        <div className="rounded-2xl bg-linear-170/oklch from-indigo-950 via-indigo-950/0 to-indigo-950/0 w-full inset-ring-4 inset-ring-white/10 border-t-2 border-gray-600">
          {/* Linear overlay 2 */}
          <div className="rounded-2xl bg-indigo-900/20 w-full flex">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
