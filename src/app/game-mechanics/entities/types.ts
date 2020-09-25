export const ALL_ENTITIES = {
    modules: 'modules',
    widgets: 'widgets',
    tokens: 'tokens',
    images: 'images',
    styles: 'styles',
    sounds: 'sounds',
    expressions: 'expressions',
    animations: 'animations',
    setups: 'setups',
    texts: 'texts',
    sonatas: 'sonatas',
    shapes: 'shapes',
    nodes: 'nodes',
    sandboxes: 'sandboxes',
    versions: 'versions',
} as const;

export type AllEntity = keyof typeof ALL_ENTITIES;