import { GameEntityList, ALL_ENTITIES, WithImage, Round } from '../entities';
import { WithKeysAs, Omit, Dictionary } from '@app/shared';

import { WithBoard } from '../entities';
import { LobbyPlayer } from '@app/lobby';

export type Game = WithBoard & Partial<{
    id: number;

    title: string;
    description: string;
    image: string;

    core_data: string;

    languages: GameLanguage[];
    menu: number;
}>

export type GameLanguage = WithImage & Partial<{
    id: number;
    owner: number; // Game
    name: string;
    display_name: string;
}>

export type GameTemplate = Omit<WithKeysAs<typeof ALL_ENTITIES, GameEntityList>, 'games'>;

export type GameConfig = GameTemplate;

export type GameState = {
    global_state: Partial<GameConfig>;
    local_state?: Dictionary;

    turn_order: number[]; // player ids determining turn order
    active_player: number; //

    setup: number;
    round: number; //
    phase: number; //
};

export type CreateGamePayload = {
    game_id: number;
    players: LobbyPlayer[];
    lobby_name: string;
    setup: number;
};