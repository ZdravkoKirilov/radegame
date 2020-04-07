import { get } from 'lodash';

import { GameTemplate, Setup, GameState, CreateExpressionParams, createExpressionContext } from "@app/game-mechanics";
import { MutateState } from '../state';

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
        mutateState: (payload: {
            path: string;
            value: any;
            broadcastTo?: number[];
            save?: boolean;
        }) => new MutateState(payload),
        listenTo: () => null,
        sendMessage: () => null,
    } as CreateExpressionParams);
};