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
    EFFECT_GROUPS: 'effect_groups',
    EFFECT_STACKS: 'effect_stacks',
    GAMES: 'games'
}

export type FormKey = typeof formKeys.RESOURCES | typeof formKeys.CHOICES | typeof formKeys.ROUNDS |
    typeof formKeys.CONDITIONS | typeof formKeys.STAGES | typeof formKeys.FIELDS |
    typeof formKeys.ACTIONS | typeof formKeys.FACTIONS | typeof formKeys.LOCATIONS |
    typeof formKeys.PATHS | typeof formKeys.EFFECT_GROUPS | typeof formKeys.EFFECT_STACKS;