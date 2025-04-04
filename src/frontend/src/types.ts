import { LucideIcon } from "lucide-react";

// User info
export type UserInfoType = {
  letters: string;
  name: string;
  age: string;
  height: string;
  weight: string;
  goals: string;
  id: string;
};

// Character info
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

// Chat message
export type ChatMessageType = {
  role: string;
  content: string;
};
