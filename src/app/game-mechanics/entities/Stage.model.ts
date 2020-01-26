import { BaseModel, WithImage, WithFrames } from "./Base.model";
import { Slot, RuntimeSlot } from "./Slot.model";
import { Omit } from "@app/shared";
import { ImageAsset, ImageFrame } from "./ImageAsset.model";
import { ExpressionFunc } from "./Expression.model";

export type Stage = BaseModel & WithImage & WithFrames & Partial<{
    width: number;
    height: number;

    computed_slots: string; // Expression => Slot[]
    slots: Slot[];
}>;

export type RuntimeStage = Omit<Stage, 'image' | 'computed_slots' | 'slots' | 'frames'> & {
    image: ImageAsset;
    computed_slots: ExpressionFunc;
    slots: RuntimeSlot[];
    frames: ImageFrame[];
};






