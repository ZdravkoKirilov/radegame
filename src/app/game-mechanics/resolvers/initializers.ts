import { compose } from 'lodash/fp';
import { GameState, GameConfig, Player } from "../models";
import { Expression, Faction, Slot } from "../entities";
import { Dictionary } from "@app/shared";

type CreateExpressionParams = {
    state: GameState;
    conf: GameConfig;
    players: Dictionary<Player>;
    self: number;
}

type CreateStateParams = {
    setup: number;
    self: number;
    players: Player[];
    conf: GameConfig;
};

export type ExpressionContext = {
    state: GameState;
    conf: GameConfig;
    players: Dictionary<Player>;
    helpers: {
        [key: string]: any;
    },
    $self: () => any
};

export const createGameState = ({ setup, self, conf, players }: CreateStateParams): GameState => {

    return {
        global_overrides: {},
        player_overrides: createPlayerOverrides(players, conf),
        players: {},
        turn_order: [],
        setup, self,
        round: null,
        phase: null,
        turn: null,
    };
};

export const createExpressionContext = ({ state, conf, self, players }: CreateExpressionParams): ExpressionContext => {
    const helpers = Object.values<Expression>(conf.expressions).filter(elem => elem.preload_as);
    return {
        state, conf, players,
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

const createSlotOverrides = (players: Player[], conf: GameConfig) => (base: Dictionary) => {
    return players.reduce((acc, player) => {
        const faction: Faction = conf.factions[player.faction];
        if (faction.slots.length) {
            const current = base[player.id] || {};
            current.slots = faction.slots.reduce((acc, slotId) => {
                const targetSlot = conf.slots[slotId] as Slot;
                acc[slotId] = {
                    items: [...targetSlot.items]
                } as Slot;
                return acc;
            }, {});
        }
        return acc;
    }, {});
};

const createPlayerOverrides = (players: Player[], conf: GameConfig) => {
    return createSlotOverrides(players, conf)({});
};