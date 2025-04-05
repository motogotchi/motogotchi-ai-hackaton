import { useState } from "react";
import {
  Armchair,
  CookingPot,
  Dumbbell,
  Bath,
  MessageCircleMore,
  Lightbulb,
  RotateCcw,
  Trash2,
} from "lucide-react";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useUserInfo } from "../hooks/useUserInfo";
import { useChat } from "../hooks/useChat";
import { useActors } from "../hooks/useActors";

// Types and Components
import { RoomActionType, RoomType } from "../types";
import GameContainer from "../components/GameContainer";
import CharacterStats from "../components/CharacterStats";
import RoomActions from "../components/RoomActions";
import Character from "../components/Character";
import UserInfo from "../components/UserInfo";
import RoomNav from "../components/RoomNav";
import Chat from "../components/Chat";
import Loading from "src/components/Loading";

const characterInfo = { health: 95, energy: 73, points: 1495 };
const character = { name: "Motogotchi", image: "/motogotchi.webp" };

const rooms: RoomType[] = [
  { icon: Armchair, label: "Home" },
  { icon: CookingPot, label: "Kitchen" },
  { icon: Dumbbell, label: "Gym" },
  { icon: Bath, label: "Bathroom" },
];

const roomActions: RoomActionType[] = [
  { icon: MessageCircleMore, label: "Chat" },
  { icon: Lightbulb, label: "Advice" },
  { icon: RotateCcw, label: "Refresh Info" },
  { icon: Trash2, label: "Clear Chat" },
];

// Game component props
interface GamePageProps {
  logout: () => Promise<void>;
}

// Game Page Component
const Game: React.FC<GamePageProps> = ({ logout }) => {
  // --- Hooks ---
  const { principal } = useAuth();
  const {
    userInfo,
    isLoading: isLoadingUserInfo,
    error: userInfoError,
    refreshUserInfo,
  } = useUserInfo();
  const {
    messages,
    sendMessage,
    fetchAdvice,
    clearChatHistory,
    isLoading: isLoadingChat,
    error: chatError,
  } = useChat();
  const { isLoading: isLoadingActors } = useActors();

  // --- Local UI State ---
  const [currentRoom, setCurrentRoom] = useState<RoomType["label"]>("Home");

  // --- Action Handler ---
  const handleActionClick = (actionLabel: string) => {
    console.log("Action clicked:", actionLabel);
    switch (actionLabel) {
      case "Advice":
        fetchAdvice();
        break;
      case "Clear Chat":
        if (
          window.confirm("Are you sure you want to clear the chat history?")
        ) {
          clearChatHistory();
        }
        break;
      case "Refresh Info":
        refreshUserInfo();
        break;
      // Handle 'Chat' implicitly via the input field, or add specific logic if needed
      // case "Play": // Example for future
      //   // Call some game interaction function
      //   break;
      // case "Snack": // Example for future
      //   // Call some game interaction function
      //   break;
      default:
        console.warn("Unhandled action:", actionLabel);
    }
  };

  // --- Loading and Error States ---
  if (isLoadingActors) {
    return (
      <GameContainer>
        <Loading message="Loading backend..." />
      </GameContainer>
    );
  }

  // --- Render ---
  const userId = principal ? principal.toText() : "Unknown Principal";

  return (
    <GameContainer>
      {/* Display Errors */}
      {userInfoError && (
        <div className="absolute top-2 left-2 bg-red-600 p-2 rounded text-white z-10">
          User Info Error: {userInfoError}
        </div>
      )}
      {chatError && (
        <div className="absolute top-12 left-2 bg-red-600 p-2 rounded text-white z-10">
          Chat Error: {chatError}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <CharacterStats character={characterInfo} />

        <div className="flex flex-1 items-center">
          {/* Pass the action handler */}
          <RoomActions
            actions={roomActions}
            onActionClick={handleActionClick}
          />
          <Character character={character} />
        </div>

        <RoomNav
          rooms={rooms}
          currentRoom={currentRoom}
          setRoom={setCurrentRoom}
        />
      </div>

      {/* Sidebar Area */}
      <div className="w-96 flex flex-col gap-4">
        {/* Pass fetched user info and ID */}
        <UserInfo
          userInfo={userInfo} // Will show defaults if null/loading
          userId={userId}
          logout={logout}
          isLoading={isLoadingUserInfo}
        />
        {/* Pass chat messages and send function */}
        <Chat
          messages={messages}
          sendMessage={sendMessage}
          isLoading={isLoadingChat}
        />
      </div>
    </GameContainer>
  );
};

export default Game;
