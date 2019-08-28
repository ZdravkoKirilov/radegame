export type LobbyPlayer = {
    name: string;
    lobby: string;
    user: number;
    game: number;

    team?: number;
    faction?: number;
    color?: number;
    ready?: boolean;
}