import { LucideIcon } from "lucide-react";

// Character
export type CharacterType = {
  name: string;
  image: string;
};

// User info (Matches backend structure, assuming Text resolves to string)
export type UserInfoType = {
  name: string;
  height: string;
  weight: string;
  goals: string;
};

// Character info (Static frontend data for now)
export type CharacterInfoType = {
  health: number;
  energy: number;
  points: number;
};

// Room
export type RoomType = {
  icon: LucideIcon;
  label: string;
};

// Room action
export type RoomActionType = {
  icon: LucideIcon;
  label: string;
};

// Chat message (Frontend representation)
export type ChatMessageType = {
  role: "user" | "assistant" | "system"; // Use specific roles
  content: string;
};

// Props for the main Game page component
export type GameProps = {
  logout: () => Promise<void>; // Only logout is needed now
};
