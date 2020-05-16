import { GameEntityList, ALL_ENTITIES, WithImage, Module, ExpressionFunc } from '../entities';
import { WithKeysAs, Omit, Dictionary } from '@app/shared';

import { WithBoard } from '../entities';
import { LobbyPlayer } from '@app/game-arena';

export type Game = WithBoard & Partial<{
    id: number;

    title: string;
    description: string;
    image: string;

    core_data: string;

    languages: GameLanguage[];
    menu: number;
    get_active_module: string;
}>

export type RuntimeGame = Omit<Game, 'menu' | 'get_active_module'> & {
    menu: Module;
    get_active_module: ExpressionFunc<string>;
}

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

    setup: number;
    module: number; //
};

export type CreateGamePayload = {
    game_id: number;
    players: LobbyPlayer[];
    lobby_name: string;
    setup: number;
};