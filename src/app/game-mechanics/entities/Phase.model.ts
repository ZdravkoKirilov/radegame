import { BaseModel, WithSettings, WithSetups } from "./Base.model";

export type Phase = BaseModel & WithSettings & WithSetups & Partial<{
    turn_cycles: number; // how many times to iterate each player before the phase is considered over. Usually 1
}>;

// If a player has to do something in his turn: A condition will be added with allowed = only him