import { Team, Faction } from '../entities';
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
    conf: GameConfig;

    players: Dictionary<any>; // each player has stages: Stage[]

    turn_order: number[]; //

    setup: number; //
    round: number; //
    phase: number ; //
    turn: number; //

    state: any; // runtime, dynamicly schemed state, different for each game
};

export type GameConfig = GameTemplate & { game: Game }