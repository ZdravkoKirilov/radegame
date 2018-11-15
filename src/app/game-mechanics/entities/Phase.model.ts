import { BaseModel, WithCondition } from "./Base.model";

export type Phase = BaseModel & WithCondition & {
    turn_cycles: number;
};

// turn condition -> WithCondition, allowed for the faction / team