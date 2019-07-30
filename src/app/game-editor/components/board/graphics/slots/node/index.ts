import { values } from 'lodash';

import { createElement, PrimitiveContainer, Points, Memo } from "@app/render-kit";
import { Slot } from "@app/game-mechanics";
import EmptySlot, { Props as EmptySlotProps } from './empty-slot';
import EmbeddedStage, { Props as EmbeddedStageProps } from './embedded-stage';
import { MainContext } from "../../context";

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
        const emptySlot = !data.board && !data.field && !data.draw;

        return (
            createElement(MainContext.Consumer, {
                render: ctx => {
                    const stage = data.board && ctx && ctx.entities.stages ? ctx.entities.stages[data.board] : null;
                    const style = ctx.entities.styles[data.style];
                    const image = data.image ? ctx.entities.images[data.image].image : '';

                    return createElement('container', {
                        styles: { x: data.x, y: data.y },
                        id: data.id, onDragMove, onDragEnd,
                        draggable: { xAxis: true, yAxis: true },
                        onPointerDown: () => onSelect(data),
                        name: `node_${data.id}`
                    },
                        stage ? createElement<EmbeddedStageProps>(EmbeddedStage, {
                            stage,
                            slots: values(ctx.entities.slots).filter(slot => slot.owner === stage.id),
                            style,
                            selected,
                            image: ctx.entities.images[stage.image]
                        }) : null,
                        emptySlot ? createElement<EmptySlotProps>(EmptySlot, { style, selected, image, data }) : null,
                    );
                }
            })
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