import { Setup, Team } from '../entities';
import { Dictionary } from '@app/shared';
import { Player } from './Player.model';
import { CommandAction } from './GameAction.model';

export type Game = Partial<{
    id: number;

    title: string;
    description: string;
    image: string;

    setups: Setup[];
}>

type Stats = Partial<{
    hand: any;
    slots: any;
    tokens: any;
    boards: any;
}>

export type GameState = Partial<{
    players: Dictionary<Player>;
    teams: Dictionary<Team>;
    index: {
        round: number; // Round id
        phase: number; // Phase id
        activePlayer: number; // Player id
    };
    lastAction: CommandAction;
    playerStats: Dictionary<Stats>; // by playerid
    teamStats: Dictionary<Stats>;
}>;