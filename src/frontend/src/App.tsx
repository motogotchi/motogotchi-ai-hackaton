import { useState } from "react";
import {
  Zap,
  CircleUserRound,
  Goal,
  Coins,
  Heart,
  Armchair,
  CookingPot,
  Dumbbell,
  Bath,
  Gamepad2,
  MessageCircleMore,
  Apple,
  Lightbulb,
  Send,
} from "lucide-react";
import * as motion from "motion/react-client";

const chatMessages = [
  {
    role: "user",
    content:
      "Curabitur ultricies ex libero, non egestas ex sodales eget. Vestibulum ac luctus turpis. Quisque massa erat, efficitur.",
  },
  {
    role: "bot",
    content: "Etiam magna risus, egestas ut nunc at, maximus pulvinar dui.",
  },
  {
    role: "user",
    content:
      "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    role: "bot",
    content: "Etiam magna risus, egestas.",
  },
];

const motogotchiInfo = {
  health: 95,
  energy: 73,
  points: 1495,
};

const userInfo = {
  letters: "JD",
  name: "John Doe",
  age: "27yr",
  height: "180cm",
  weight: "60kg",
  goals: "Get fit, work out more and eat better more natural foods.",
  id: "k5mnn-mzdtd-cowdf-3quvk-glcl6-oov6l-ejahp-fx5jk-eq4gv-d6wlr-gae",
};

const rooms = [
  { icon: Armchair, label: "Home" },
  { icon: CookingPot, label: "Kitchen" },
  { icon: Dumbbell, label: "Gym" },
  { icon: Bath, label: "Bathroom" },
];

const actions = [
  { icon: Gamepad2, label: "Play" },
  { icon: Apple, label: "Snack" },
  { icon: MessageCircleMore, label: "Chat" },
  { icon: Lightbulb, label: "Advice" },
];

// Main application
const App = () => {
  // const [userInfo, setUserInfo] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState("Home");

  return (
    <div className="p-16 min-h-dvh flex font-clash">
      {/* Main container */}
      <div className="m-auto w-full max-w-5xl relative border-[20px] border-black/40 rounded-4xl">
        {/* Bg Glow */}
        <div className="absolute inset-0 bg-indigo-700/30 blur-xl scale-105 -rotate-3"></div>

        {/* Room Bg Img */}
        <div className="relative flex w-full rounded-2xl shadow-2xl bg-[url(/public/room-bg.webp)] bg-no-repeat bg-center bg-cover inset-ring-4 inset-ring-white/10">
          <div className="rounded-2xl bg-linear-170/oklch from-indigo-950 via-indigo-950/0 to-indigo-950/0 w-full inset-ring-4 inset-ring-white/10 border-t-2 border-gray-600">
            <div className="rounded-2xl bg-indigo-900/20 w-full flex gap-4">
              {/* Main */}
              <div className="flex-1 flex flex-col">
                {/* Top stats */}
                <div className="flex justify-between p-8 pb-0">
                  {/* Points */}
                  <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="bg-linear-to-bl from-yellow-600 to-orange-600 transition group-hover:from-yellow-500 group-hover:to-orange-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg p-3 rounded-lg inset-ring-white/20 inset-ring-4">
                      <Coins className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className=" font-semibold text-3xl leading-none">
                        {motogotchiInfo.points.toLocaleString()}
                      </div>
                      <div className=" text-sm tracking-wider font-semibold text-gray-400 uppercase">
                        Points
                      </div>
                    </div>
                  </div>

                  {/* Health */}
                  <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="bg-linear-to-bl from-rose-600 to-pink-600 transition group-hover:from-rose-500 group-hover:to-pink-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg p-3 rounded-lg inset-ring-white/20 inset-ring-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className=" font-semibold text-3xl leading-none">
                        {motogotchiInfo.health}
                      </div>
                      <div className=" text-sm tracking-wider font-semibold text-gray-400 uppercase">
                        Health
                      </div>
                    </div>
                  </div>

                  {/* Energy */}
                  <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="bg-linear-to-bl from-lime-600 to-emerald-600 transition group-hover:from-lime-500 group-hover:to-emerald-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg p-3 rounded-lg inset-ring-white/20 inset-ring-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className=" font-semibold text-3xl leading-none">
                        {motogotchiInfo.energy}
                      </div>
                      <div className=" text-sm tracking-wider font-semibold text-gray-400 uppercase">
                        Energy
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main */}
                <div className="flex flex-1 items-center">
                  {/* Actions */}
                  <div className="flex flex-col gap-4 border-t-2 border-gray-400/80 bg-gray-900/60 backdrop-blur-lg rounded-2xl inset-ring-4 inset-ring-white/30 -ml-8 w-24 p-4">
                    {actions.map((action) => (
                      <div className="flex items-center justify-center bg-linear-to-bl from-violet-600 to-fuchsia-600 transition hover:from-violet-500 hover:to-fuchsia-500 hover:scale-110 hover:rotate-3 shadow-lg p-3 rounded-lg inset-ring-white/20 inset-ring-4 aspect-square cursor-pointer active:translate-y-px">
                        <action.icon className="w-8 h-8 text-white" />
                      </div>
                    ))}
                  </div>

                  {/* Motogotchi */}
                  <motion.div
                    className="m-auto p-10"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      scale: {
                        type: "spring",
                        visualDuration: 0.5,
                        bounce: 0.4,
                      },
                    }}
                  >
                    <img
                      className="h-96"
                      src="/public/motogotchi.webp"
                      alt="/"
                    />
                  </motion.div>
                </div>

                {/* Rooms nav */}
                <div className="flex gap-2 p-6 pt-0">
                  {rooms.map((room) => (
                    <button
                      onClick={() => setCurrentRoom(room.label)}
                      className={`
                        border-t-2 border-white/40 flex items-center justify-center gap-2 bg-linear-210 transition hover:scale-105 shadow-lg py-3 px-5 rounded-lg flex-1 inset-ring-4 inset-ring-white/20 active:translate-y-px cursor-pointer
                        ${
                          room.label == currentRoom
                            ? "from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500"
                            : "from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
                        }
                      `}
                    >
                      <room.icon className="w-6 h-6 text-white/80" />
                      <span className="font-medium tracking-wide  text-lg">
                        {room.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-96 flex flex-col gap-4">
                {/* User box */}
                <div className="shadow-lg border-t-2 border-gray-400/80 -mt-8 -mr-8 flex flex-col gap-3 bg-gray-900/60 backdrop-blur-lg rounded-2xl inset-ring-4 inset-ring-white/30 p-6">
                  {/* User header */}
                  <div className="flex gap-4 items-center w-full">
                    {/* Avatar */}
                    <div className="flex rounded-lg bg-linear-240 from-gray-500 to-gray-600 inset-ring-4 inset-ring-white/20 w-10 h-10">
                      <div className="m-auto font-semibold">JD</div>
                    </div>

                    {/* Name */}
                    <div className="flex-1 overflow-hidden">
                      <div className="font-medium text-lg leading-none">
                        {userInfo.name}
                      </div>
                      <div
                        title={userInfo.id}
                        className="text-gray-500 overflow-ellipsis whitespace-nowrap overflow-hidden"
                      >
                        {userInfo.id}
                      </div>
                    </div>

                    {/* Log out */}
                    <button className="cursor-pointer transition-colors font-medium bg-gray-700 rounded-lg py-2 px-3 hover:bg-gray-600 active:translate-y-px inset-ring-4 inset-ring-white/15">
                      Log out
                    </button>
                  </div>

                  {/* Light box */}
                  <div className="bg-gray-700/60 text-sm rounded-lg py-2.5 px-3.5 border-t border-gray-700 shadow-lg">
                    {/* Info */}
                    <div className="text-gray-300 flex">
                      <div className="font-medium text-gray-400 w-14 shrink-0">
                        Info
                      </div>
                      <div className="tracking-wide flex gap-2">
                        <span>{userInfo.age}</span>
                        <span className="text-gray-400 font-semibold">
                          &middot;
                        </span>
                        <span>{userInfo.height}</span>
                        <span className="text-gray-400 font-semibold">
                          &middot;
                        </span>
                        <span>{userInfo.weight}</span>
                      </div>
                    </div>

                    <div className="h-px bg-white/10 my-1.5"></div>

                    {/* Goals */}
                    <div className="text-gray-300 flex">
                      <div className="font-medium text-gray-400 w-14 shrink-0">
                        Goals
                      </div>
                      <div className="tracking-wide leading-tight mt-0.5">
                        {userInfo.goals}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat box */}
                <div className="flex flex-col flex-1 border-t-2 shadow-lg border-white/40 bg-linear-210 from-violet-800 to-fuchsia-800 inset-ring-4 inset-ring-white/20 -mb-8 -mr-8 rounded-2xl">
                  {/* Chat header */}
                  <div className="flex items-center justify-between py-4 px-6 border-b-2 border-white/10">
                    <div className="flex items-center gap-2">
                      <MessageCircleMore className="text-white/50" />
                      <div className="font-medium text-lg leading-none">
                        Conversation
                      </div>
                    </div>
                    <button className="border-2 border-white/20 rounded-md px-2 py-1 text-sm tracking-wide cursor-pointer active:translate-y-px hover:border-white/30 transition hover:bg-white/10">
                      View history
                    </button>
                  </div>

                  {/* Chat area */}
                  <div className="flex-1 flex flex-col px-6 py-2 gap-4 justify-end">
                    {chatMessages.map((message) => {
                      if (message.role === "user") {
                        return (
                          <div className="pl-4 flex gap-3 justify-end items-end">
                            <div className="leading-snug bg-white/30 rounded-lg shadow-md px-3 py-2 border-t border-white/20">
                              {message.content}
                            </div>
                            <div className="flex shrink-0 rounded-lg w-8 h-8 border-3 border-white/30 bg-gray-500 shadow">
                              <span className="m-auto text-sm font-semibold text-white/70">
                                JD
                              </span>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="pr-4 flex gap-3 items-end">
                            <div className="bg-[url(/public/motogotchi-avatar.webp)] bg-cover w-8 h-8 shrink-0 rounded-lg inset-ring-[3px] inset-ring-white/30 shadow"></div>
                            <div className="bg-white/10 leading-snug rounded-lg shadow-md px-3 py-2 border-t border-white/20">
                              {message.content}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>

                  {/* Chat form */}
                  <div className="p-2 rounded-xl flex items-center gap-2  m-2">
                    {/* Input */}
                    <input
                      className="w-full bg-gray-300 text-black placeholder:text-gray-500 rounded-lg px-4 py-3.5 focus:outline-0 inset-ring-4 inset-ring-white"
                      type="text"
                      placeholder="Your message.."
                    />

                    {/* Button */}
                    <button className="flex cursor-pointer bg-linear-210 from-teal-600 to-cyan-600 transition hover:from-teal-500 hover:to-cyan-500 hover:scale-105 shadow-lg rounded-lg inset-ring-4 inset-ring-white/20 aspect-square h-full active:translate-y-px">
                      <Send className="w-5 h-5 m-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
