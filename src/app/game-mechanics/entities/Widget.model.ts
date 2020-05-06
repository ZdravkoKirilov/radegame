import { BaseModel, WithFrames } from "./Base.model";
import { Slot } from "./Slot.model";
import { Omit } from "@app/shared";
import { ImageFrame } from "./ImageAsset.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { StatefulComponent } from "@app/render-kit";

export type Widget = BaseModel & WithFrames & Partial<{
    width: number;
    height: number;

    slot_getter: string; // Expression => Slot[]
    slots: Slot[];

    frame_getter: string;
}>;

type WidgetExpressionPayload = {
    widget: RuntimeWidget;
    component: StatefulComponent;
}

export type RuntimeWidget = Omit<Widget, 'slot_getter' | 'frame_getter'> & {
    slot_getter: ParamedExpressionFunc<WidgetExpressionPayload, Slot[]>;
    frame_getter: ParamedExpressionFunc<WidgetExpressionPayload, ImageFrame>;
};






