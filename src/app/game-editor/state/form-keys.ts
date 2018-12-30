export const formKeys = {
    CHOICES: 'choices',
    ROUNDS: 'rounds',
    PHASES: 'phases',
    CONDITIONS: 'conditions',
    STAGES: 'stages',
    FIELDS: 'fields',
    ACTIONS: 'actions',
    FACTIONS: 'factions',
    TOKENS: 'tokens',
    SLOTS: 'slots',
    PATHS: 'paths',
    TEAMS: 'teams',
    SOURCES: 'sources',
    GAMES: 'games',
    IMAGES: 'images',
}

export type FormKey = typeof formKeys.CHOICES | typeof formKeys.ROUNDS |
    typeof formKeys.CONDITIONS | typeof formKeys.STAGES | typeof formKeys.FIELDS |
    typeof formKeys.ACTIONS | typeof formKeys.FACTIONS | typeof formKeys.SLOTS |
    typeof formKeys.PATHS | typeof formKeys.TOKENS |
    typeof formKeys.PHASES | typeof formKeys.TEAMS | typeof formKeys.IMAGES;