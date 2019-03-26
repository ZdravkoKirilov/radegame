import { createElement, PrimitiveContainer, Points, RenderFunction, DynamicSprite } from "@app/rendering";
import { Slot } from "@app/game-mechanics";
import { composePoints } from "@app/rendering";

export type Props = {
    data: Slot;
    image: string;
    selected: boolean;
    onDragMove: (comp: PrimitiveContainer) => void;
    onDragEnd: (slot: Slot) => void;
    onSelect: (item: Slot) => void;
};

export const Node: RenderFunction<Props> = (props) => {


    const { data, onDragMove, onDragEnd, onSelect, selected, image } = props;

    return (
        createElement('container', {
            styles: { x: data.x, y: data.y },
            id: data.id, draggable: { xAxis: true, yAxis: true }, onDragMove, onDragEnd,
            onPointerDown: () => onSelect(data),
        },
            createElement(data.shape || 'rectangle', {
                container: true,
                button: true,
                points: composePoints(data.points),
                styles: {
                    strokeThickness: selected ? 5 : 1,
                    strokeColor: 0x00ff00,
                    x: 0,
                    y: 0,
                    width: data.width + 10,
                    height: data.height + 35,
                    borderRadius: 5,
                    radius: data.width
                }
            }),
            image ? createElement(DynamicSprite, {
                image: image, styles: {
                    x: 5,
                    y: 30,
                    width: data.width,
                    height: data.height,
                }
            }) : null,
            createElement('text', {
                value: data.name, styles: {
                    x: 5,
                    y: 5,
                }, textStyle: {
                    fontSize: 18,
                    stroke: '#141619',
                    fill: '#141619'
                }
            })

        )
    );

    // return (
    //     createElement('container', {
    //         styles: { x: data.x, y: data.y },
    //         id: data.id, draggable: true, onDragMove, onDragEnd,
    //         onPointerDown: () => onSelect(data),
    //     },
    //         createElement(data.shape || 'rectangle', {
    //             container: true,
    //             button: true,
    //             points: composePoints(data.points),
    //             styles: {
    //                 strokeThickness: selected ? 5 : 1,
    //                 strokeColor: 0x00ff00,
    //                 x: 0,
    //                 y: 0,
    //                 width: data.width + 10,
    //                 height: data.height + 35,
    //                 borderRadius: 5,
    //                 radius: data.width
    //             }
    //         },
    //             image ? createElement(DynamicSprite, {
    //                 image: image, styles: {
    //                     x: 5,
    //                     y: 30,
    //                     width: data.width,
    //                     height: data.height,
    //                 }
    //             }) : null,
    //             createElement('text', {
    //                 value: data.name, styles: {
    //                     x: 5,
    //                     y: 5,
    //                 }, textStyle: {
    //                     fontSize: 18,
    //                     stroke: '#141619',
    //                     fill: '#141619'
    //                 }
    //             })
    //         ),

    //     )
    // );
};

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