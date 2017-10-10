export interface Ability {
    id: number;
    name: string;
}

export interface AbilityList {
    [key: string]: Ability;
}
