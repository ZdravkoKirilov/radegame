import { GameAction, ActionConfig } from "../entities";
import { GameState, GameConfig } from "./Game.model";
import { MutatorAction } from "@app/game-arena";

type MultiActionsTransformerPayload = {
    actions: GameAction[];
    state: GameState;
    config: GameConfig;
};

type SingleActionTransformerPayload = {
    action: GameAction;
    state: GameState;
    config: GameConfig;

    action_config?: ActionConfig;
};

export type MultiActionsTransformer = (payload: MultiActionsTransformerPayload) => MutatorAction[];
export type SingleActionTransformer = (payload: SingleActionTransformerPayload) => MutatorAction[];