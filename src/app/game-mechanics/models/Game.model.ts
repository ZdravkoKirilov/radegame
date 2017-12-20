export interface Game {
    id?: number;
    title?: string;
    boardType?: string;
    published?: boolean;
}

export interface GameList {
    [key: string]: Game;
}
