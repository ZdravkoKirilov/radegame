export type LobbyPlayer = {
    id: string;

    name: string;
    lobby: string;
    user: number;
    game: number;

    data?: {}; // arbitrary data, depending on the game. Color, Team and so on
}