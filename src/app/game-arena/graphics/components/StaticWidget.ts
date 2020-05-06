import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
  connectToStore, Style, RuntimeSlot, Widget, WidgetRenderer, WidgetRendererProps, RuntimeWidget,
  selectWidgetFrameSync, selectWidgetSlotsSync, ExpressionContext,
} from "@app/game-mechanics";
import { selectRuntimeWidget, selectExpressionContext } from "../../state";
import NodeFactory, { NodeFactoryProps } from "./Factory";

export type StaticWidgetProps = {
  widget: Widget;
  style: Style;
  fromParent?: any;
}

type StoreProps = {
  runtimeWidget: RuntimeWidget;
  context: ExpressionContext;
};

type Props = StaticWidgetProps & StoreProps;

export class StaticWidget extends StatefulComponent<Props> {

  render() {
    const self = this;
    const { runtimeWidget, context, style, fromParent } = this.props;

    const frame = selectWidgetFrameSync(runtimeWidget, context, self);
    const slots = selectWidgetSlotsSync(runtimeWidget, context, self);

    return createElement<WidgetRendererProps>(WidgetRenderer, {
      widget: runtimeWidget, slots, style, frame,
      renderChild: (slot: RuntimeSlot) => {

        return createElement<RzElementPrimitiveProps>(
          'container',
          {
            styles: { x: slot.x, y: slot.y },
            id: slot.id,
            name: `node_${slot.id}`
          },
          createElement<NodeFactoryProps>(NodeFactory, { data: slot, fromParent }),
        );
      },
      renderFrame: widget => createElement<StaticWidgetProps>(StaticWidget, { widget, style, fromParent }),
    });
  }
};

const mapStateToProps = (state: AppState, ownProps: StaticWidgetProps): StoreProps => ({
  runtimeWidget: selectRuntimeWidget(ownProps.widget)(state),
  context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(StaticWidget);