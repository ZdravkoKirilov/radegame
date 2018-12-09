import { RenderFunction, createElement, PrimitiveContainer } from "@app/rendering";
import { Slot } from "@app/game-mechanics";

import Node, { Props as NodeProps } from './node';

export type Props = {
    slots: Slot[];
    selected: Slot;
    onDragMove: (comp: PrimitiveContainer) => void;
    onDragEnd: (id: number) => void;
    selectSlot: (item: Slot) => void;
}

export const SlotsList: RenderFunction<Props> = ({ slots, selected, onDragMove, onDragEnd, selectSlot }) => {

    const items = slots.map(elem => {
        return createElement<NodeProps>(Node, {
            data: elem, key: elem.id, onDragMove,
            onDragEnd: () => onDragEnd(elem.id),
            onSelect: selectSlot,
            selected: selected && selected.id === elem.id,
        });
    });

    return createElement('collection', null, items);

}

export default SlotsList;