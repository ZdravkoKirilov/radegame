export interface GameBoard {
    displayName: string;
    allowedMovements: string[];
    supportedActions: string[];
    id: string;
}
export interface GameBoardTypes {
    [key: string]: GameBoard;
}
