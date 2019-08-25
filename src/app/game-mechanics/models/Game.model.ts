import { Team, Faction, Slot } from '../entities';
import { Dictionary } from '@app/shared';

import { WithBoard } from '../entities';
import { GameTemplate } from './GameTemplate.model';

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

    players: Dictionary<any>; // each player has stages: Stage[]

    turn_order: number[]; // player ids determining turn order

    self: number;
    setup: number;
    round: number; //
    phase: number; //
    turn: number; //
};

export type GameConfig = GameTemplate & { game: Game }