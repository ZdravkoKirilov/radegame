export type Player = {
    name: string;
    lobby: string;
    user: number;
    game: number;

    team?: number;
    faction?: number;
    color?: number;
}