import { GameAction, ActionConfig } from "../entities";
import { GameConfig } from "./Game.model";
import { MutatorAction } from "@app/game-arena";
import { GameState } from "../helpers";

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

export type MultiActionsTransformer<T = MutatorAction> = (payload: MultiActionsTransformerPayload) => T[];
export type SingleActionTransformer<T = MutatorAction> = (payload: SingleActionTransformerPayload) => T[];