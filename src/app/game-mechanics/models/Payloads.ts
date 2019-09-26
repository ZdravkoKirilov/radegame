import { GameAction } from "../entities";

export type GameActionsPayload = {
  actions: GameAction[];
  initiator: number; // Player id
};