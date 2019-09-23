import { get } from 'lodash';

import { GameState, Player, GameTemplate } from "../models";
import { Expression, Slot, Setup } from "../entities";
import { Dictionary } from "@app/shared";
import { evaluate } from './helpers';
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
        compute: typeof evaluate
    },
    $self: Player,
    $own_turn: boolean,
    $player_overrides: (player: Player, path: string) => any;
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
        global_overrides: {},
        player_overrides: createPlayerOverrides(players, conf),
        turn_order,
        setup,
        round: first_round.id,
        phase: null,
        active_player: turn_order[0],
    };
};

export const createExpressionContext = ({ state, conf, self, players }: CreateExpressionParams): ExpressionContext => {
    const helpers = Object.values<Expression>(conf.expressions).filter(elem => elem.preload_as);
    const ctx = {
        state, conf, players,
        helpers: composeHelpers(helpers),
        get $self(): Player {
            return Object.values(players).find(player => player.id === self);
        },
        get $own_turn() {
            return ctx.$self.id === state.active_player;
        },
        $player_overrides(player: Player, path: string) {
            const overrides = state.player_overrides[player.id];
            return get(overrides, path, {});
        }
    };
    return ctx;
};

const composeHelpers = (expressions: Expression[]) => {
    return expressions.reduce((result, item) => {
        result[item.preload_as] = evaluate(item.code, {});
        return result;
    }, {
            compute: evaluate
        }
    );
};

const createSlotOverrides = (players: Player[], conf: GameTemplate) => (base: Dictionary) => {
    return players.reduce((acc, player) => {
        const slots: number[] = get(conf, `factions[${player.faction}].slots`, null);
        if (slots) {
            const current = base[player.id] || {};
            current.slots = slots.reduce((acc, slotId) => {
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

const createPlayerOverrides = (players: Player[], conf: GameTemplate) => {
    return createSlotOverrides(players, conf)({});
};