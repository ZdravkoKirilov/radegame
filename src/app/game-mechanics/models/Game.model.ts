export interface Game {
    id?: number;
    title?: string;
    image?: string;

    min_players?: number;
    max_players?: number;
    recommended_age?: number;

    main_stage?: number;

    hide_factions?:boolean;
}

export interface GameList {
    [key: string]: Game;
}
