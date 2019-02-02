import { ENTITY } from '../entities';

export type WithTrigger = {
    type: typeof ENTITY.ACTION | typeof ENTITY.CHOICE | typeof ENTITY.CONDITION;
    card: number; // Could be id for: Choice / Action / Condition
}

export type Playable = WithTrigger | {
    type: typeof ENTITY.TOKEN;
    card: number; // Token
}
