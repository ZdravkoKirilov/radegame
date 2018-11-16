import { BaseModel, WithSettings } from "./Base.model";

export type Phase = BaseModel & WithSettings & {
    turn_cycles: number;
};

// If a player has to do something in his turn: A condition will be added with allowed = only him