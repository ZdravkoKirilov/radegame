export type EffectStack = Partial<{
    id: number;
    game: number;
    action: number;
    condition: number;

    relation: StackRelation;
}>;

export const StackRelations = {
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT'
};

export type StackRelation = keyof typeof StackRelations;

export type StackList = {[key: string]: EffectStack};