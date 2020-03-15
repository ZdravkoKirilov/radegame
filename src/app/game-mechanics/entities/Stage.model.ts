import { BaseModel, WithFrames } from "./Base.model";
import { Slot } from "./Slot.model";
import { Omit } from "@app/shared";
import { ImageFrame } from "./ImageAsset.model";
import { ParamedExpressionFunc } from "./Expression.model";

export type Stage = BaseModel & WithFrames & Partial<{
    width: number;
    height: number;

    slot_getter: string; // Expression => Slot[]
    slots: Slot[];

    frame_getter: string;
}>;

export type RuntimeStage = Omit<Stage, 'slot_getter' | 'slots' | 'frames' | 'frame_getter'> & {
    slot_getter: ParamedExpressionFunc<any, Slot[]>;
    slots: Slot[];
    frames: ImageFrame[];
    frame_getter: ParamedExpressionFunc<any, ImageFrame>;
};






