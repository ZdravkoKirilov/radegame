import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
  connectToStore, Style, RuntimeSlot, Widget, WidgetRenderer, WidgetRendererProps, RuntimeWidget, combineStyles,
  ExpressionContext, selectWidgetSlotsSync, selectWidgetFrameSync
} from "@app/game-mechanics";
import { selectRuntimeWidget, selectExpressionContext } from "../../state";
import NodeFactory, { NodeFactoryProps } from "./Factory";

export type StaticWidgetProps = {
  widget: Widget;
  style: Style;
}

type StoreProps = {
  runtimeWidget: RuntimeWidget;
  context: ExpressionContext;
};

type Props = StaticWidgetProps & StoreProps;

class StaticWidget extends StatefulComponent<Props>  {

  render() {
    const self = this;
    const { style, runtimeWidget, context } = this.props;
    const slots = selectWidgetSlotsSync(runtimeWidget, context, self);
    const frame = selectWidgetFrameSync(runtimeWidget, context, self);

    return createElement<WidgetRendererProps>(WidgetRenderer, {
      widget: runtimeWidget, slots, style, frame,
      renderChild: (slot: RuntimeSlot) => {
        const composedStyle = combineStyles(slot, style);

        return createElement<RzElementPrimitiveProps>(
          'container',
          {
            styles: { x: slot.x, y: slot.y, z_order: composedStyle.z_order },
            id: slot.id,
            name: `node_${slot.id}`
          },
          createElement<NodeFactoryProps>(NodeFactory, { data: slot }),
        );
      },
      renderFrame: widget => createElement<StaticWidgetProps>(StaticWidget, { widget, style }),
    });
  }
};

const mapStateToProps = (state: AppState, ownProps: StaticWidgetProps): StoreProps => ({
  runtimeWidget: selectRuntimeWidget(ownProps.widget)(state),
  context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(StaticWidget);