import { Setup, Team, Faction } from '../entities';
import { Dictionary } from '@app/shared';
import { Player } from './Player.model';
import { CommandAction } from './GameAction.model';
import { WithBoard } from '../entities';
import { GameTemplate } from './GameTemplate.model';

export type Game = WithBoard & Partial<{
    id: number;

    title: string;
    description: string;
    image: string;
}>

type Stats = Partial<{
    hand: any;
    slots: any;
    tokens: any;
    boards: any;
}>

export type GameState = {
    conf: GameConfig;
    players: Dictionary<Player>;
    teams?: Dictionary<Team>;
    factions?: Dictionary<Faction>;
    index: {
        round: number; // Round id
        phase: number; // Phase id
        activePlayer: number; // Player id
        lastAction: CommandAction;
    };
    playerStats: Dictionary<Stats>; // by playerid
    teamStats?: Dictionary<Stats>;
};

export type GameConfig = GameTemplate & {
    game: Game;
}