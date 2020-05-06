export type InteractiveEntityType = keyof typeof INTERACTIVE_ENTITY;

export const INTERACTIVE_ENTITY = {
    'TOKEN': 'TOKEN',
    'CHOICE': 'CHOICE',
} as const;

export const ALL_ENTITIES = {
    choices: 'choices',
    rounds: 'rounds',
    widgets: 'widgets',
    tokens: 'tokens',
    games: 'games',
    images: 'images',
    styles: 'styles',
    sounds: 'sounds',
    expressions: 'expressions',
    animations: 'animations',
    transitions: 'transitions',
    setups: 'setups',
    texts: 'texts',
    sonatas: 'sonatas',
    shapes: 'shapes',
    slots: 'slots',
} as const;

export type AllEntity = keyof typeof ALL_ENTITIES;