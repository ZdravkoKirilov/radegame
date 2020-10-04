import { Nominal } from 'simplytyped';

import { Omit, safeJSON } from "@app/shared";
import { StatefulComponent, RzNode } from "@app/render-kit";

import { ParamedExpressionFunc } from "./Expression.model";
import { BaseModel, WithStyle } from "./Base.model";
import { WidgetNode } from "./WidgetNode.model";
import { ExpressionContext } from "../models";
import { enrichEntity, parseAndBind } from "../helpers";

export type WidgetId = Nominal<string, 'WidgetId'>;

export const toWidgetId = (source: string | number) => String(source) as WidgetId;

export type Widget = BaseModel<WidgetId> & WithStyle & Partial<{

  node_getter: string; // Expression => WidgetNode[]
  nodes: WidgetNode[];

  frame_getter: string;

  render: string;
}>;

export const Widget = {
  toRuntime(context: ExpressionContext, widget: Widget) {
    return enrichEntity<Widget, RuntimeWidget>(context.conf, {
      node_getter: src => parseAndBind(context)(src),
      frame_getter: src => parseAndBind(context)(src),
      render: src => parseAndBind(context)(src),
      style: src => parseAndBind(context)(src),
      style_inline: src => safeJSON(src, {}),
    }, widget);
  }
}

type WidgetExpressionPayload = {
  widget: RuntimeWidget;
  component: StatefulComponent;
}

export type RuntimeWidget = Omit<Widget, 'node_getter' | 'frame_getter' | 'render'> & {
  node_getter: ParamedExpressionFunc<WidgetExpressionPayload, WidgetNode[]>;
  frame_getter: ParamedExpressionFunc<WidgetExpressionPayload, any>;
  render: ParamedExpressionFunc<WidgetExpressionPayload, RzNode>;
};






