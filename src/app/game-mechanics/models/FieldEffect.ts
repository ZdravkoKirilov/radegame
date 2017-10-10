export interface Effect {
    id: number;
    name: string;
}

export interface EffectsList {
    [key: string]: Effect;
}
