import { createElement, PrimitiveContainer, Points, RenderFunction, DynamicSprite } from "@app/rendering";
import { Slot } from "@app/game-mechanics";

type Props = {
    data: Slot;
    onDragMove: (comp: PrimitiveContainer) => void;
};

export const Node: RenderFunction<Props> = (props) => {

    const { data, onDragMove } = props;

    return (
        createElement('container', { styles: { x: data.x, y: data.y }, id: data.id, draggable: true, onDragMove },
            createElement('rectangle', {
                interactive: true,
                container: true,
                styles: {
                    strokeThickness: 1,
                    strokeColor: 0x00ff00,
                    x: 0,
                    y: 0,
                    width: data.width + 10,
                    height: data.height + 10,
                }
            },
                createElement(DynamicSprite, {
                    image: data.image, styles: {
                        x: 5,
                        y: 5,
                        width: data.width,
                        height: data.height,
                    }
                }),
                createElement('text', {
                    value: data.name, styles: {
                        x: 10,
                        y: 10,
                    }, textStyle: {
                        fontSize: 18
                    }
                })
            ),

        )
    );
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