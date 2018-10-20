import { Player } from './Player.model';
import { GameAction } from '../entities';

export type PlayerAction = {
    type: string;
    payload: {
        player: Player;
        data: GameAction;
    };
}