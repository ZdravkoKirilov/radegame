import { Slot, GameEntityList, ALL_ENTITIES, WithImage, Round } from '../entities';
import { Dictionary, WithKeysAs, Omit } from '@app/shared';

import { WithBoard } from '../entities';

export type Game = WithBoard & Partial<{
    id: number;

    title: string;
    description: string;
    image: string;

    languages: GameLanguage[];
    menu: number | Round;
}>

export type GameLanguage = WithImage & Partial<{
    id: number;
    owner: number; // Game
    name: string;
    display_name: string;
}>

export type GameState = {
    
    global_state: Partial<GameConfig>;
    player_state: Dictionary<{
        [key: string]: {
            slots: Dictionary<Slot>
        }
    }>;
    local_state?: Dictionary;

    turn_order: number[]; // player ids determining turn order
    active_player: number; //

    setup: number;
    round: number; //
    phase: number; //

};

export type GameTemplate = Omit<WithKeysAs<typeof ALL_ENTITIES, GameEntityList>, 'games'>;

export type GameConfig = GameTemplate;