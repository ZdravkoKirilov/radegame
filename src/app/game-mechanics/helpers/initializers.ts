import { get } from 'lodash';

import { Player, GameTemplate, GameConfig } from "../models";
import { Expression, Setup } from "../entities";
import { Dictionary } from "@app/shared";
import { parseFromString } from './misc';
import { LobbyPlayer } from '@app/lobby';

export type GameState = {
    global_state: Partial<GameConfig>;
    local_state?: Dictionary;

    turn_order: number[]; // player ids determining turn order
    active_player: number; //

    setup: number;
    round: number; //
    phase: number; //
};

type CreateExpressionParams = {
    state: GameState;
    conf: GameTemplate;
    players: Dictionary<Player>;
    self: number;
    loaded_chunks: string[];
}

export type ExpressionContext = {
    loaded_chunks: string[];
    state: GameState;
    conf: GameTemplate;
    players: Dictionary<Player>;
    helpers: {
        [key: string]: any;
    },
    $self: Player,
    $get: typeof get,
};

export type CreateGamePayload = {
    game_id: number;
    players: LobbyPlayer[];
    lobby_name: string;
    setup: number;
};

export type CreateStateParams = {
    setup: number;
    players: Player[];
    conf: GameTemplate;
    round?: number;
};

export const createGameState = (payload: CreateStateParams): GameState => {
    const { setup, conf, round, players } = payload;
    const setup_data: Setup = conf.setups[setup];
    const first_round = get(setup_data, ['rounds', 0, 'id']);
    const turn_order = players.map(player => player.id);
    return {
        global_state: {},
        turn_order,
        setup,
        round: round || first_round,
        phase: null,
        active_player: turn_order[0],
    };
};

export const createExpressionContext = ({ state, conf, self, players, loaded_chunks }: CreateExpressionParams): ExpressionContext => {
    const helpers = Object.values<Expression>(conf.expressions);
    const ctx = {
        state, conf, players, loaded_chunks,
        helpers: composeHelpers(helpers),
        get $self(): Player {
            return Object.values(players).find(player => player.user === self);
        },
        $get: get,
    };
    return ctx;
};

const composeHelpers = (expressions: Expression[]) => {
    return expressions.reduce((result, item) => {
        result[item.name] = parseFromString({} as any)(item.code);
        return result;
    }, {
        compute: parseFromString
    }
    );
};