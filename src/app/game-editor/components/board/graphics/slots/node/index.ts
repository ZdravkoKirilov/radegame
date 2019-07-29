import { createElement, PrimitiveContainer, Points, Memo } from "@app/render-kit";
import { Slot, Style, ImageAsset } from "@app/game-mechanics";
import EmptySlot, { Props as EmptySlotProps } from './empty-slot';
import EmbeddedStage, { Props as EmbeddedStageProps } from './embedded-stage';
import { MainContext } from "../../context";

export type Props = {
    data: Slot;
    style: Style,
    image: string;
    selected: boolean;
    images: ImageAsset[];
    onDragMove: (comp: PrimitiveContainer) => void;
    onDragEnd: (slot: Slot) => void;
    onSelect: (item: Slot) => void;
};

export const Node = Memo<Props>(
    (props) => {
        const { data, style, onDragMove, onDragEnd, onSelect, selected, image, images } = props;
        const emptySlot = !data.board && !data.field && !data.draw;

        return (
            createElement(MainContext.Consumer, {
                render: ctx => {
                    const stage = data.board && ctx && ctx.stages ? ctx.stages.find(elem => elem.id === data.board) : null;

                    return createElement('container', {
                        styles: { x: data.x, y: data.y },
                        id: data.id, onDragMove, onDragEnd,
                        draggable: { xAxis: true, yAxis: true },
                        onPointerDown: () => onSelect(data),
                        name: `node_${data.id}`
                    },
                        stage ? createElement<EmbeddedStageProps>(EmbeddedStage, {
                            stage,
                            slots: ctx.slots.filter(slot => slot.owner === stage.id),
                            style,
                            selected,
                            image: images.find(img => stage.image === img.id)
                        }) : null,
                        emptySlot ? createElement<EmptySlotProps>(EmptySlot, { style, selected, image, data }) : null,
                    )
                }
            })
        );
    },
    ['data', 'style', 'image', 'selected'],
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