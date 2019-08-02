import { createElement, PrimitiveContainer, Points, Memo } from "@app/render-kit";
import { Slot } from "@app/game-mechanics";
import StaticNode, { Props as StaticNodeProps } from './static-node';

export type Props = {
    data: Slot;
    selected: boolean;
    onDragMove: (comp: PrimitiveContainer) => void;
    onDragEnd: (slot: Slot) => void;
    onSelect: (item: Slot) => void;
};

export const Node = Memo<Props>(
    (props) => {
        const { data, onDragMove, onDragEnd, onSelect, selected } = props;

        return createElement(
            'container',
            {
                styles: { x: data.x, y: data.y },
                id: data.id, onDragMove, onDragEnd,
                draggable: { xAxis: true, yAxis: true },
                onPointerDown: () => onSelect(data),
                name: `node_${data.id}`
            },
            createElement<StaticNodeProps>(StaticNode, { data, selected })
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