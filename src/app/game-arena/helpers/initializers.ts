import { get } from 'lodash';

import { Player, GameTemplate, Setup, GameState } from "@app/game-mechanics";

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