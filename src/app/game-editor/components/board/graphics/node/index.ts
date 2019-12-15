import { createElement, PrimitiveContainer, Points, RenderFunction } from "@app/render-kit";
import { RuntimeSlot, Style, connect } from "@app/game-mechanics";

import FacadeSlot, { EnhancedFacadeSlotProps } from './facade-slot';
import { AppState } from "@app/core";
import { selectSlotStyle } from "app/game-editor/state";

export type Props = Partial<StoreProps> & {
    data: RuntimeSlot;
    selected: boolean;
    onDragMove: (comp: PrimitiveContainer) => void;
    onDragEnd: (slot: RuntimeSlot) => void;
    onSelect: (item: RuntimeSlot) => void;
};

type StoreProps = {
    style: Style;
}

export const Node: RenderFunction<Props> = (props) => {
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
                width: Number(style.width),
                height: Number(style.height),
                border_radius: 5,
                radius: style.width
            }
        }) : null,
        createElement<EnhancedFacadeSlotProps>(
            FacadeSlot,
            { data }
        ),
    );
};

const mapStateToProps = (state: AppState, ownProps: Props): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(Node);

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

    return polygon as Points;
};