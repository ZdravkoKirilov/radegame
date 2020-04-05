import { get } from 'lodash';

import { GameTemplate, Setup, GameState, CreateExpressionParams, createExpressionContext } from "@app/game-mechanics";

export type CreateStateParams = {
    setup: number;
    conf: GameTemplate;
    round?: number;
};

export const createGameState = (payload: CreateStateParams): GameState => {
    const { setup, conf, round } = payload;
    const setup_data: Setup = conf.setups[setup];
    const first_round = get(setup_data, ['rounds', 0, 'id']);

    return {
        global_state: {},
        setup,
        round: round || first_round,
    };
};

export const createArenaExpressionContext = (params: Partial<CreateExpressionParams>) => {
    return createExpressionContext({
        ...params,
        mutateState: () => null,
        mutateStateAndSave: () => null,
        listenTo: () => null,
        sendMessage: () => null,
    } as CreateExpressionParams);
};