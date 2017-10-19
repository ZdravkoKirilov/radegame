export interface Character {
    id?: number;
    name?: string;
    image?: string;
    abilities?: string[];
}

export interface CharacterList {
    [key: string]: Character;
}

