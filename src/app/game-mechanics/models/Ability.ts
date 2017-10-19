export interface Ability {
    id?: number|string;
    name?: string;
    mode?: string;
    actions?: string[];
}

export interface AbilityList {
    [key: string]: Ability;
}

export const abilityModes = {
    TRIGGER: 'TRIGGER',
    PASSIVE: 'PASSIVE'
};
