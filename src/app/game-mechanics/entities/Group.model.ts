import { BaseModel, WithPermissions, WithCost, WithSetups } from "./Base.model";

export type Group = BaseModel & Partial<{
    items: GroupItem[];
}>

export type GroupItem = WithPermissions & WithCost & WithSetups & Partial<{
    id: number;
    owner: number;

    action: number; //GameAction;
    condition: number; //Condition;
    choice: number; //Choice;
    token: number; //Token;
    group: number; // Group;

    amount: number; // for token attributes / Number of available instance for drawing

    relation: GroupRelation;
}>

export const GROUP_RELATION = {
    NONE: 'NONE',
    AND: 'AND',
    OR: 'OR',
};

export type GroupRelation = keyof typeof GROUP_RELATION;