export interface Character {
    id?: number|string;
    name?: string;
    image?: string;
    abilities?: string[];
    description?: string;
}

export interface CharacterList {
    [key: string]: Character;
}

