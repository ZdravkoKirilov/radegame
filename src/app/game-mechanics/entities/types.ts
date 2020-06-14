export type InteractiveEntityType = keyof typeof INTERACTIVE_ENTITY;

export const INTERACTIVE_ENTITY = {
    'TOKEN': 'TOKEN',
    'CHOICE': 'CHOICE',
} as const;

export const ALL_ENTITIES = {
    choices: 'choices',
    modules: 'modules',
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
    nodes: 'nodes',
    sandboxes: 'sandboxes',
    versions: 'versions',
} as const;

export type AllEntity = keyof typeof ALL_ENTITIES;