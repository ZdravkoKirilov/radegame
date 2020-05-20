import {
  StatefulComponent, createElement, RzElement
} from "@app/render-kit";

import { defaultFrameRenderFunc } from "./WidgetNode";
import { RuntimeWidget, RuntimeWidgetNode, Widget } from "../../entities";
import { ExpressionContext } from "../../models";
import { selectWidgetNodesSync, selectWidgetFrameSync, CommonGameStore, selectRuntimeWidget, selectExpressionContext } from "../../helpers";
import { WidgetRendererProps, WidgetRenderer } from "../presentational";
import { connectToStore } from "../../hocs";

type Props = RootWidgetProps & StoreProps;

export type RootWidgetProps = {
  widget: Widget;
  fromParent?: {},
  renderChild: (node: RuntimeWidgetNode) => RzElement;
}

type StoreProps = {
  runtimeWidget: RuntimeWidget;
  context: ExpressionContext;
}

class _RootWidget extends StatefulComponent<Props> {

  render() {
    const { context, runtimeWidget, renderChild } = this.props;
    const nodes = selectWidgetNodesSync(runtimeWidget, context, self);
    const frame = selectWidgetFrameSync(runtimeWidget, context, self);

    return (
      createElement<WidgetRendererProps>(
        WidgetRenderer,
        {
          renderChild, nodes, frame,
          widget: runtimeWidget,
          style: { width: runtimeWidget.width, height: runtimeWidget.height },
          renderFrame: defaultFrameRenderFunc(null),
        }
      )
    )
  }
}

const mapStateToProps = (state: CommonGameStore, ownProps: RootWidgetProps): StoreProps => ({
  runtimeWidget: selectRuntimeWidget(ownProps.widget)(state),
  context: selectExpressionContext(state),
});

export const RootWidget = connectToStore(mapStateToProps)(_RootWidget);
