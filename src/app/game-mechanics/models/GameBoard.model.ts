export interface GameBoard {
    displayName: string;
    id: string;
}
export interface GameBoardTypes {
    [key: string]: GameBoard;
}
