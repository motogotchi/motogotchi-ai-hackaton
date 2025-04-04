import { useState, useEffect } from "react";
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
  CharacterType,
  ChatMessageType,
  RoomActionType,
  RoomType,
  UserInfoType,
  GameProps,
} from "./types";

import GameContainer from "./components/GameContainer";
import CharacterStats from "./components/CharacterStats";
import RoomActions from "./components/RoomActions";
import Character from "./components/Character";
import UserInfo from "./components/UserInfo";
import RoomNav from "./components/RoomNav";
import Chat from "./components/Chat";

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
      "Curabitur ultricies ex libero, non egestas ex sodales eget. Vestibulum ac luctus turpis. Quisque massa erat, efficitur.",
  },
  {
    role: "bot",
    content: "Etiam magna risus, egestas ut nunc at, maximus pulvinar dui.",
  },
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

const character: CharacterType = {
  name: "Motogotchi",
  image: "/public/motogotchi.webp",
};

const defaultUserInfo: UserInfoType = {
  name: "John Doe",
  height: "180cm",
  weight: "60kg",
  goals: "Get fit, work out more and eat better more natural foods.",
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

// Game
const Game = ({
  logout,
  authClient,
  httpAgent,
  mainActor,
  userActor,
}: GameProps) => {
  ///////////////
  // Variables //
  ///////////////

  // State
  const [currentRoom, setCurrentRoom] = useState<RoomType["label"]>("Home");
  const [userInfo, setUserInfo] = useState<UserInfoType>(defaultUserInfo);
  const [userId, setUserId] = useState("");

  ///////////////
  // Functions //
  ///////////////

  // Get user info
  const getUserInfo = async () => {
    // const info = await userActor?.getUserInfo();
    // setUserInfo(info);
    // const identity = authClient.getIdentity();
    // const id = identity.getIdentity().toString();
    // setUserId(id);
  };

  // Send chat message
  const sendChatMessage = (message: string) => {
    console.log({ message });
  };

  // Initialize game
  useEffect(() => {
    async function initGame() {
      // const info = await userActor?.getUserInfo();
      // setUserInfo(info);
      // const identity = authClient.getIdentity();
      // const id = identity.getIdentity().toString();
      // setUserId(id);
    }
    initGame();
  }, [authClient]);

  ////////////
  // Render //
  ////////////

  return (
    <GameContainer>
      {/* Main */}
      <div className="flex-1 flex flex-col">
        <CharacterStats character={characterInfo} />

        <div className="flex flex-1 items-center">
          <RoomActions actions={roomActions} />
          <Character character={character} />
        </div>

        <RoomNav
          rooms={rooms}
          currentRoom={currentRoom}
          setRoom={setCurrentRoom}
        />
      </div>

      {/* Sidebar */}
      <div className="w-96 flex flex-col gap-4">
        <UserInfo userInfo={userInfo} userId={userId} logout={logout} />
        <Chat messages={chatMessages} sendMessage={sendChatMessage} />
      </div>
    </GameContainer>
  );
};

export default Game;
