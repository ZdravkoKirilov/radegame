import { createElement, PrimitiveContainer, Points, RenderFunction } from "@app/rendering";

type Props = {
    mapped: any;
    text: any;
    sprite: any;
    styles: any;
    id: any;
    onDragMove: (comp: PrimitiveContainer) => void;
};

export const Node: RenderFunction<Props> = (props) => {

    const { sprite, text, styles, id, onDragMove } = props;
    return (
        createElement('container', { styles, draggable: true, id, onDragMove },
            createElement('rectangle', {
                interactive: true,
                container: true,
                styles: {
                    strokeThickness: 1,
                    strokeColor: 0x00ff00,
                    x: 0,
                    y: 0,
                    width: 200,
                    height: 200,
                }
            },
                createElement('sprite', { ...sprite, onPointerDown: () => console.log('click!') }),
                createElement('text', { ...text })
            ),

        )
    );
    // return (
    //     createElement('container', { styles, draggable: true, id, onDragMove },
    //         createElement('polygon', {
    //             points: computePolygon(sprite, text),
    //             styles: {
    //                 strokeThickness: 5,
    //                 strokeColor: 0x00ff00,
    //             }
    //         }),
    //         createElement('sprite', { ...sprite, onPointerDown: () => console.log('click!') }),
    //         createElement('text', { ...text }),
    //     )
    // );

};

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