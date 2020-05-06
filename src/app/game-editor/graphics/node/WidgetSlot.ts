import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    RuntimeSlot, Style, connectToStore, WidgetRendererProps, WidgetRenderer, RuntimeWidget,
    combineStyles, ExpressionContext, selectWidgetSlotsSync, selectWidgetFrameSync, selectSlotStyleSync
} from "@app/game-mechanics";
import { selectRuntimeWidget, selectExpressionContext } from '../../state';

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticWidget, { StaticWidgetProps } from "./StaticWidget";

export type EnhancedWidgetSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    widget: RuntimeWidget;
    context: ExpressionContext;
};

type Props = EnhancedWidgetSlotProps & StoreProps;

class EnhancedWidgetSlot extends StatefulComponent<Props> {

    render() {
        const self = this;
        const { widget, context, data } = this.props;
        const slots = selectWidgetSlotsSync(widget, context, self);
        const frame = selectWidgetFrameSync(widget, context, self);
        const style = selectSlotStyleSync(data, self);

        return createElement<WidgetRendererProps>(WidgetRenderer, {
            widget, slots, style, frame,
            renderChild: (slot: RuntimeSlot) => {
                const composedStyle = combineStyles(slot, style);

                return createElement<RzElementPrimitiveProps>(
                    'container',
                    {
                        styles: { x: slot.x, y: slot.y, z_order: composedStyle.z_order },
                        id: slot.id,
                        name: `node_${slot.id}`
                    },
                    createElement<NodeFactoryProps>(NodeFactory, { data: slot })
                );
            },
            renderFrame: widget => createElement<StaticWidgetProps>(StaticWidget, { widget, style }),
        });
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedWidgetSlotProps): StoreProps => ({
    widget: selectRuntimeWidget(ownProps.data.board)(state),
    context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(EnhancedWidgetSlot);