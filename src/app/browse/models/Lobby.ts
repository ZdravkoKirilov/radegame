export type Lobby = {
    name: string;
    mode: 'public' | 'private';
    password: string;

    game: number;
    setup: number;
    owner: number;
}