import { BaseModel, WithImage, WithFrames } from "./Base.model";
import { Slot, RuntimeSlot } from "./Slot.model";
import { Omit } from "@app/shared";
import { ImageAsset, ImageFrame } from "./ImageAsset.model";
import { ParamedExpressionFunc } from "./Expression.model";

export type Stage = BaseModel & WithImage & WithFrames & Partial<{
    width: number;
    height: number;

    slot_getter: string; // Expression => Slot[]
    slots: Slot[];

    frame_getter: string;
}>;

export type RuntimeStage = Omit<Stage, 'image' | 'slot_getter' | 'slots' | 'frames' | 'frame_getter'> & {
    image: ImageAsset;
    slot_getter: ParamedExpressionFunc<any, RuntimeSlot[]>;
    slots: RuntimeSlot[];
    frames: ImageFrame[];
    frame_getter: ParamedExpressionFunc<any, ImageFrame>;
};






