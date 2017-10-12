export interface GameBoard {
    displayName: string;
    allowedMovements: string[];
    id: string;
}
export interface GameBoardTypes {
    [key: string]: GameBoard;
}
