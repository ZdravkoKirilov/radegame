import { createElement, PrimitiveContainer, Points, Memo } from "@app/render-kit";
import { Slot, Style } from "@app/game-mechanics";

import FacadeSlot, { EnhancedFacadeSlotProps } from './facade-slot';

export type Props = Partial<StoreProps> & {
    data: Slot;
    selected: boolean;
    onDragMove: (comp: PrimitiveContainer) => void;
    onDragEnd: (slot: Slot) => void;
    onSelect: (item: Slot) => void;
};

type StoreProps = {
    style: Style;
}

export const Node = Memo<Props>(
    (props) => {
        const { data, onDragMove, onDragEnd, onSelect, selected, style } = props;
        return createElement(
            'container',
            {
                styles: { x: data.x, y: data.y },
                id: data.id, onDragMove, onDragEnd,
                draggable: { xAxis: true, yAxis: true },
                onPointerDown: () => onSelect(data),
                name: `node_${data.id}`
            },
            selected ? createElement('rectangle', {
                button: true,
                styles: {
                    stroke_thickness: 5,
                    stroke_color: style.stroke_color,
                    x: 0,
                    y: 0,
                    width: Number(style.width) + 10,
                    height: Number(style.height) + 35,
                    border_radius: 5,
                    radius: style.width
                }
            }) : null,
            createElement<EnhancedFacadeSlotProps>(
                FacadeSlot,
                { data }
            ),
        );
    },
    ['data', 'selected'],
);

export default Node;

const computePolygon = (sprite, text): Points => {
    const padding = 0;
    const x1 = sprite.styles.x;
    const y1 = sprite.styles.y - text.textStyle.fontSize;
    const x2 = sprite.styles.x + sprite.styles.width;
    const y2 = sprite.styles.y + sprite.styles.height;
    const polygon = [
        [x1 - padding, y1 - padding],
        [x2 + padding, y1 - padding],
        [x2 + padding, y2 + padding],
        [x1 - padding, y2 + padding],
        [x1 - padding, y1 - padding],
    ];

    return polygon;
};