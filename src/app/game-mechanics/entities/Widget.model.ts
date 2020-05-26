import { BaseModel, WithFrames } from "./Base.model";
import { WidgetNode } from "./WidgetNode.model";
import { Omit } from "@app/shared";
import { ImageFrame } from "./ImageAsset.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { StatefulComponent } from "@app/render-kit";

export type Widget = BaseModel & WithFrames & Partial<{
    width: number;
    height: number;

    node_getter: string; // Expression => WidgetNode[]
    nodes: WidgetNode[];

    frame_getter: string;
}>;

type WidgetExpressionPayload = {
    widget: RuntimeWidget;
    component: StatefulComponent;
}

export type RuntimeWidget = Omit<Widget, 'node_getter' | 'frame_getter'> & {
    node_getter: ParamedExpressionFunc<WidgetExpressionPayload, WidgetNode[]>;
    frame_getter: ParamedExpressionFunc<WidgetExpressionPayload, ImageFrame>;
};





