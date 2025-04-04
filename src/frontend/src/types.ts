import { LucideIcon } from "lucide-react";
import { ActorSubclass as AS, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

import { _SERVICE as MainService } from "declarations/main/main.did.d";
import { _SERVICE as UserService } from "declarations/user/user.did.d";

// Character
export type CharacterType = {
  name: string;
  image: string;
};

// User info
export type UserInfoType = {
  name: string;
  height: string;
  weight: string;
  goals: string;
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

export type GameProps = {
  authClient: AuthClient;
  httpAgent: HttpAgent;
  mainActor: AS<MainService>;
  userActor: AS<UserService>;
  logout: () => {};
};
