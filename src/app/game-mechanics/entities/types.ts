export type EntityType = keyof typeof ENTITY;

export const ENTITY = {
    'TOKEN': 'TOKEN',
    'CONDITION': 'CONDITION',
    'ACTION': 'ACTION',
    'CHOICE': 'CHOICE',
    'FIELD': 'FIELD',
} as const;