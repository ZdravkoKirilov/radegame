import { get } from 'lodash';

import { GameState, GameConfig, Player } from "../models";
import { Expression, Faction, Slot } from "../entities";
import { Dictionary } from "@app/shared";
import { evaluate } from './helpers';
import { LobbyPlayer } from '@app/lobby';

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
    gameId: number;
};

export type ExpressionContext = {
    state: GameState;
    conf: GameConfig;
    players: Dictionary<Player>;
    helpers: {
        [key: string]: any;
        compute: typeof evaluate
    },
    $self: () => any,
    $playerOverrides: (player: Player, path: string) => any;
};

export type CreateGamePayload = {
    game_id: number;
    players: LobbyPlayer[];
    lobbyName: string;
};

export const createGameState = ({ setup, conf, players }: CreateStateParams): GameState => {

    return {
        global_overrides: {},
        player_overrides: createPlayerOverrides(players, conf),
        turn_order: [],
        setup,
        round: null,
        phase: null,
        turn: null,
    };
};

export const createInitialGameState = ({game_id: gameId, players}: CreateGamePayload) => {
    return {
        gameId,
        players,
    };
};

export const createExpressionContext = ({ state, conf, self, players }: CreateExpressionParams): ExpressionContext => {
    const helpers = Object.values<Expression>(conf.expressions).filter(elem => elem.preload_as);
    return {
        state, conf, players,
        helpers: composeHelpers(helpers),
        $self() {
            return Object.values(players).find(player => player.id === self);
        },
        $playerOverrides(player: Player, path: string) {
            const overrides = state.player_overrides[player.id];
            return get(overrides, path, {});
        }
    };
};

const composeHelpers = (expressions: Expression[]) => {
    return expressions.reduce((result, item) => {
        result[item.preload_as] = item.code;
        return result;
    }, {
            compute: evaluate
        }
    );
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