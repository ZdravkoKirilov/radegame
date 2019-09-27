export type InteractiveEntity = keyof typeof INTERACTIVE_ENTITY;

export const INTERACTIVE_ENTITY = {
    'TOKEN': 'TOKEN',
    'CONDITION': 'CONDITION',
    'ACTION': 'ACTION',
    'CHOICE': 'CHOICE',
    'FIELD': 'FIELD',
} as const;

export const ALL_ENTITIES = {
    choices: 'choices',
    rounds: 'rounds',
    phases: 'phases',
    conditions: 'conditions',
    stages: 'stages',
    fields: 'fields',
    actions: 'actions',
    factions: 'factions',
    tokens: 'tokens',
    slots: 'slots',
    paths: 'paths',
    teams: 'teams',
    games: 'games',
    images: 'images',
    keywords: 'keywords',
    styles: 'styles',
    sounds: 'sounds',
    states: 'states',
    expressions: 'expressions',
    animations: 'animations',
    transitions: 'transitions',
    handlers: 'handlers',
    setups: 'setups',
} as const;

export type AllEntity = keyof typeof ALL_ENTITIES;