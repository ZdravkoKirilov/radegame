export const formKeys = {
    RESOURCES: 'resources',
    CHOICES: 'choices',
    ROUNDS: 'rounds',
    CONDITIONS: 'conditions',
    STAGES: 'stages',
    FIELDS: 'fields',
    ACTIONS: 'actions',
    FACTIONS: 'factions',
    LOCATIONS: 'locations',
    PATHS: 'paths',
    POOLS: 'pools',
    STACKS: 'stacks',
    GAMES: 'games'
}

export type FormKey = typeof formKeys.RESOURCES | typeof formKeys.CHOICES | typeof formKeys.ROUNDS |
    typeof formKeys.CONDITIONS | typeof formKeys.STAGES | typeof formKeys.FIELDS |
    typeof formKeys.ACTIONS | typeof formKeys.FACTIONS | typeof formKeys.LOCATIONS |
    typeof formKeys.PATHS | typeof formKeys.POOLS | typeof formKeys.STACKS;