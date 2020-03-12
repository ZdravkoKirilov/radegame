import { createElement, PrimitiveContainer, RenderFunction, RzDraggable, RzDraggableProps, RzPoint, RzElementPrimitiveProps } from "@app/render-kit";
import { RuntimeSlot, Style, connect } from "@app/game-mechanics";

import { AppState } from "@app/core";
import { selectSlotStyle } from "app/game-editor/state";
import NodeFactory, { NodeFactoryProps } from "./Factory";

export type Props = Partial<StoreProps> & {
    data: RuntimeSlot;
    selected: boolean;
    onDragMove: (id: number, coords: RzPoint) => void;
    onDragEnd: (id: number) => void;
    onSelect: (item: RuntimeSlot) => void;
};

type StoreProps = {
    style: Style;
}

export const Node: RenderFunction<Props> = (props) => {
    const { data, onDragMove, onDragEnd, onSelect, selected, style } = props;
    const _style = style || {} as Style;

    return (
        createElement<RzDraggableProps>(
            RzDraggable,
            {
                onDragEnd: (coords) => {
                    onDragEnd(data.id);
                },
                onDragMove: (coords) => {
                    onDragMove(data.id, coords);
                },
                startPosition: { x: data.x, y: data.y },
                render: (coords => {

                    return (
                        createElement<RzElementPrimitiveProps>(
                            'container',
                            {
                                styles: { x: coords.x, y: coords.y, z_order: _style.z_order },
                                id: data.id,
                                onPointerDown: () => onSelect(data),
                                name: `node_${data.id}`
                            },
                            createElement<NodeFactoryProps>(
                                NodeFactory,
                                { data }
                            ),
                        )
                    )
                }),
            },
        )
    )

    // return createElement(
    //     'container',
    //     {
    //         styles: { x: data.x, y: data.y, z_order: _style.z_order },
    //         id: data.id,
    //         onDragMove,
    //         onDragEnd,
    //         draggable: { xAxis: true, yAxis: true },
    //         onPointerDown: () => onSelect(data),
    //         name: `node_${data.id}`
    //     },
    //     selected ? createElement('rectangle', {
    //         button: true,
    //         styles: {
    //             stroke_thickness: 5,
    //             stroke_color: _style.stroke_color,
    //             x: 0,
    //             y: 0,
    //             width: Number(_style.width),
    //             height: Number(_style.height),
    //             border_radius: 5,
    //             radius: _style.width
    //         }
    //     }) : null,
    //     createElement<NodeFactoryProps>(
    //         NodeFactory,
    //         { data }
    //     ),
    // );
};

const mapStateToProps = (state: AppState, ownProps: Props): StoreProps => ({
    style: selectSlotStyle(ownProps.data),
});

export default connect(mapStateToProps)(Node);