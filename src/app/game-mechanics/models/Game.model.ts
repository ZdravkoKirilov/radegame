import { Slot, GameEntityList, ALL_ENTITIES } from '../entities';
import { Dictionary, WithKeysAs, Omit } from '@app/shared';

import { WithBoard } from '../entities';

export type Game = WithBoard & Partial<{
    id: number;

    title: string;
    description: string;
    image: string;
}>

export type GameState = {
    
    global_overrides: Partial<GameConfig>;
    player_overrides: Dictionary<{
        [key: string]: {
            slots: Dictionary<Slot>
        }
    }>;

    turn_order: number[]; // player ids determining turn order

    setup: number;
    round: number; //
    phase: number; //
    active_player: number; //
};

export type GameTemplate = Omit<WithKeysAs<typeof ALL_ENTITIES, GameEntityList>, 'games'>;

export type GameConfig = GameTemplate;