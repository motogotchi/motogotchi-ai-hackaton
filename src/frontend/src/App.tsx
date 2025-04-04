import { useState } from "react";
import {
  Armchair,
  CookingPot,
  Dumbbell,
  Bath,
  Gamepad2,
  MessageCircleMore,
  Apple,
  Lightbulb,
} from "lucide-react";

import {
  CharacterInfoType,
  ChatMessageType,
  RoomActionType,
  RoomType,
  UserInfoType,
} from "./types";
import CharacterStats from "./components/CharacterStats";
import RoomActions from "./components/RoomActions";
import Character from "./components/Character";
import UserInfo from "./components/UserInfo";
import RoomNav from "./components/RoomNav";
import Chat from "./components/Chat";
import GameContainer from "./components/GameContainer";

const chatMessages: ChatMessageType[] = [
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

const characterInfo: CharacterInfoType = {
  health: 95,
  energy: 73,
  points: 1495,
};

const userInfo: UserInfoType = {
  letters: "JD",
  name: "John Doe",
  age: "27yr",
  height: "180cm",
  weight: "60kg",
  goals: "Get fit, work out more and eat better more natural foods.",
  id: "k5mnn-mzdtd-cowdf-3quvk-glcl6-oov6l-ejahp-fx5jk-eq4gv-d6wlr-gae",
};

const rooms: RoomType[] = [
  { icon: Armchair, label: "Home" },
  { icon: CookingPot, label: "Kitchen" },
  { icon: Dumbbell, label: "Gym" },
  { icon: Bath, label: "Bathroom" },
];

const roomActions: RoomActionType[] = [
  { icon: Gamepad2, label: "Play" },
  { icon: Apple, label: "Snack" },
  { icon: MessageCircleMore, label: "Chat" },
  { icon: Lightbulb, label: "Advice" },
];

// Main application
const App = () => {
  const [currentRoom, setCurrentRoom] = useState<RoomType["label"]>("Home");

  // Send chat message
  const sendChatMessage = (message: string) => {
    console.log({ message });
  };

  return (
    <div className="p-16 min-h-dvh flex font-clash">
      {/* Main container */}
      <GameContainer>
        {/* Main */}
        <div className="flex-1 flex flex-col">
          <CharacterStats character={characterInfo} />

          <div className="flex flex-1 items-center">
            <RoomActions actions={roomActions} />
            <Character />
          </div>

          <RoomNav
            rooms={rooms}
            currentRoom={currentRoom}
            setRoom={setCurrentRoom}
          />
        </div>

        {/* Sidebar */}
        <div className="w-96 flex flex-col gap-4">
          <UserInfo userInfo={userInfo} />
          <Chat messages={chatMessages} sendMessage={sendChatMessage} />
        </div>
      </GameContainer>
    </div>
  );
};

export default App;
