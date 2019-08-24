import { GameState, GameConfig } from "../models";
import { Expression } from "../entities";

type CreateExpressionParams = {
    state: GameState;
    conf: GameConfig;
    self: number;
}

type CreateStateParams = {
    setup: number;
    self: number;
    conf: GameConfig;
};

export type ExpressionContext = {
    state: GameState;
    conf: GameConfig;
    helpers: {
        [key: string]: any;
    },
    $self: () => any
};

export const createGameState = ({ setup, self, conf }: CreateStateParams): GameState => {
    return {
        global_overrides: {},
        player_overrides: {},
        players: {},
        turn_order: [],
        setup, self,
        round: null,
        phase: null,
        turn: null,
    };
};

export const createExpressionContext = ({ state, conf, self }: CreateExpressionParams): ExpressionContext => {
    const helpers = Object.values<Expression>(conf.expressions).filter(elem => elem.preload_as);
    return {
        state, conf,
        helpers: composeHelpers(helpers),
        $self() {
            return state.players.find(player => player.id === self);
        }
    };
};

const composeHelpers = (expressions: Expression[]): {} => {
    return expressions.reduce((result, item) => {
        result[item.preload_as] = item.code;
        return result;
    }, {});
};