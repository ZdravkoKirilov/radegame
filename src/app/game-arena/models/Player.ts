export type LobbyPlayer = {
    name: string;
    lobby: string;
    user: number;

    data?: {}; // arbitrary data, depending on the game. Color, Team and so on
}