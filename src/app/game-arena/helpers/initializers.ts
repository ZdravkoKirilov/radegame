import { get } from 'lodash';

import { GameTemplate, Setup, GameState, CreateExpressionParams, createExpressionContext } from "@app/game-mechanics";
import { MutateState } from '../state';

export type CreateStateParams = {
    setup: number;
    module?: number;
};

export const createGameState = (payload: CreateStateParams): GameState => {
    const { setup, module } = payload;

    return {
        global_state: {},
        setup,
        module,
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