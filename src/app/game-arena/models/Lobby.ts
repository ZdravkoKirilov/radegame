export type Lobby = {
    name: string; // primary key
    mode: 'public' | 'private';
    password?: string;

    game: number;
    setup: number;
    owner: number;
}