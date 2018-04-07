import { Player } from './Player.model';
import { Activity } from '../entities';

export type GameAction = {
    type: string;
    payload: {
        player: Player;
        data: Activity;
    };
}