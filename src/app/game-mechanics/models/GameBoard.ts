export interface GameBoard {
    displayName: string;
    allowedMovements: string[];
    supportedAbilities: string[];
    id: string;
}
export interface GameBoardTypes {
    [key: string]: GameBoard;
}
