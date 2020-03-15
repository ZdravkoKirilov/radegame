import { GameAction, ActionConfig, GameConfig, GameState } from "@app/game-mechanics";
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

export type MultiActionsTransformer<T = MutatorAction> = (payload: MultiActionsTransformerPayload) => T[];
export type SingleActionTransformer<T = MutatorAction> = (payload: SingleActionTransformerPayload) => T[];