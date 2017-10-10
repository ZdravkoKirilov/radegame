export interface Character {
    id: number;
    name: string;
    abilities: number[];
}

export interface CharacterList {
    [key: string]: Character;
}

