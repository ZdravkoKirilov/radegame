import { Setup } from '../entities';

export type Game = Partial<{
    id: number;

    title: string;
    description: string;
    image: string;

    setups: Setup[];
}>

export interface GameList {
    [key: string]: Game;
}

export type GameState = Partial<{

}>;