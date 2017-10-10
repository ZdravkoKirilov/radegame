import { MovementsList } from './Movement';

export interface GameBoard {
    displayName: string;
    allowedMovements: MovementsList;
}
export interface GameBoardTypes {
    [key: string]: GameBoard;
}
