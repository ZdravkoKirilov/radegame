export interface GameBoard {
    displayName: string;
    id: string;
}
export interface GameBoardList {
    [key: string]: GameBoard;
}
