import { RuntimeWidget, RuntimeSlot, WidgetRendererProps, WidgetRenderer, RuntimeImageFrame } from "@app/game-mechanics";
import { Memo, createElement, RzElementPrimitiveProps } from "@app/render-kit";
import NodeFactory, { NodeFactoryProps } from "../Factory";
import StaticWidget, { StaticWidgetProps } from "../StaticWidget";

export type ModuleWidgetProps = {
    widget: RuntimeWidget;
    slots: RuntimeSlot[];
    frame: RuntimeImageFrame;
}

type Props = ModuleWidgetProps;

export const ModuleWidget = Memo<Props>(({ widget, slots, frame }) => {
    return createElement<WidgetRendererProps>(
        WidgetRenderer,
        {
            renderChild: (slot: RuntimeSlot) => {
                return createElement<RzElementPrimitiveProps>(
                    'container',
                    { styles: { x: slot.x, y: slot.y } },
                    createElement<NodeFactoryProps>(
                        NodeFactory,
                        { data: slot }
                    )
                )

            },
            slots, frame, widget,
            style: { width: widget.width, height: widget.height },
            renderFrame: widget => {
                return createElement<StaticWidgetProps>(StaticWidget, {
                    widget: widget,
                    style: { width: widget.width, height: widget.height }
                });
            }
        }
    )
}, ['widget', 'slots', 'frame']);