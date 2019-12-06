import { BaseModel, WithImage } from "./Base.model";

export type Stage = BaseModel & WithImage & Partial<{
    width: number;
    height: number;

    get_slots: string; // Expression => Slot[]
}>;






