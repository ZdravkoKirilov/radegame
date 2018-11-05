export const ENTITY_TYPES = {
    'FACTION': 'FACTION',
    'TOKEN': 'TOKEN',
    'CONDITION': 'CONDITION',
    'ACTION': 'ACTION',
    'ROUND': 'ROUND',
    'PHASE': 'PHASE',
    'CHOICE': 'CHOICE',
    'FIELD': 'FIELD',
    'STAGE': 'STAGE',
    'TEAM': 'TEAM',
    'RESOURCE': 'RESOURCE',
    'LOCATION': 'LOCATION',
}

export type EntityType = keyof typeof ENTITY_TYPES;