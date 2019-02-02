export const MUTATORS = {
    SET_PLAYERS: 'SET_PLAYERS',
    SET_TEAMS: 'SET_TEAMS',
    SET_FACTIONS: 'SET_FACTIONS',
    SET_LAST_ACTION: 'SET_LAST_ACTION',
    SET_CONFIG: 'SET_CONFIG',
    
}

export type Mutator = keyof typeof MUTATORS;