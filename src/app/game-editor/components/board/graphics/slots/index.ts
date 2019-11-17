import { createElement, PrimitiveContainer, Memo } from "@app/render-kit";
import { Slot } from "@app/game-mechanics";

import Node, { Props as NodeProps } from '../node';

export type Props = {
    slots: Slot[];
    selected: Slot;
    onDragMove: (comp: PrimitiveContainer) => void;
    onDragEnd: (id: number) => void;
    selectSlot: (item: Slot) => void;
}

export const SlotsList = Memo<Props>(
    ({ slots, selected, onDragMove, onDragEnd, selectSlot, key }) => {
        const items = slots.map(elem => {
            return createElement<NodeProps>(Node, {
                data: elem, key: elem.id, onDragMove,
                onDragEnd: () => onDragEnd(elem.id),
                onSelect: selectSlot,
                selected: selected && selected.id === elem.id,
            });
        });
        return createElement('collection', { key, name: 'slots' }, items);
    },
    ['slots', 'selected']
)

export default SlotsList;