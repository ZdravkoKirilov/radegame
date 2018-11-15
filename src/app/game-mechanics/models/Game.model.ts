import { Edition } from '../entities';

export type Game = Partial<{
    id: number;
    title: string;
    image: string;

    min_players: number;
    max_players: number;
    recommended_age: number;

    main_stage: number;

    hide_factions: boolean;

    editions: Edition[];
}>

export interface GameList {
    [key: string]: Game;
}
