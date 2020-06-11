import { Omit } from "@app/shared";
import { StatefulComponent, RzNode } from "@app/render-kit";

import { ImageFrame } from "./ImageAsset.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { BaseModel, WithFrames, WithStyle } from "./Base.model";
import { WidgetNode } from "./WidgetNode.model";

export type Widget = BaseModel & WithFrames & WithStyle & Partial<{

    node_getter: string; // Expression => WidgetNode[]
    nodes: WidgetNode[];

    frame_getter: string;

    render: string;
}>;

type WidgetExpressionPayload = {
    widget: RuntimeWidget;
    component: StatefulComponent;
}

export type RuntimeWidget = Omit<Widget, 'node_getter' | 'frame_getter' | 'render'> & {
    node_getter: ParamedExpressionFunc<WidgetExpressionPayload, WidgetNode[]>;
    frame_getter: ParamedExpressionFunc<WidgetExpressionPayload, ImageFrame>;
    render: ParamedExpressionFunc<WidgetExpressionPayload, RzNode>;
};






