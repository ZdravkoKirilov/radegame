import { get } from 'lodash';

import { GameState, Player, GameTemplate } from "../models";
import { Expression, Slot, Setup } from "../entities";
import { Dictionary } from "@app/shared";
import { parseFromString } from './misc';
import { LobbyPlayer } from '@app/lobby';

type CreateExpressionParams = {
    state: GameState;
    conf: GameTemplate;
    players: Dictionary<Player>;
    self: number;
}

export type CreateStateParams = {
    setup: number;
    players: Player[];
    conf: GameTemplate;
};

export type ExpressionContext = {
    state: GameState;
    conf: GameTemplate;
    players: Dictionary<Player>;
    helpers: {
        [key: string]: any;
    },
    $self: Player,
    $own_turn: boolean,
    $get: typeof get
};

export type CreateGamePayload = {
    game_id: number;
    players: LobbyPlayer[];
    lobby_name: string;
    setup: number;
};

export const createGameState = ({ setup, conf, players }: CreateStateParams): GameState => {
    const setup_data: Setup = conf.setups[setup];
    const first_round = setup_data.rounds[0];
    const turn_order = players.map(player => player.id);
    return {
        global_state: {},
        turn_order,
        setup,
        round: first_round.id,
        phase: null,
        active_player: turn_order[0],
    };
};

export const createExpressionContext = ({ state, conf, self, players }: CreateExpressionParams): ExpressionContext => {
    const helpers = Object.values<Expression>(conf.expressions);
    const ctx = {
        state, conf, players,
        helpers: composeHelpers(helpers),
        get $self(): Player {
            return Object.values(players).find(player => player.user === self);
        },
        get $own_turn() {
            return ctx.$self.id === state.active_player;
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