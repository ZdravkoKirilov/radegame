import { RenderFunction, createElement, PrimitiveContainer } from "@app/rendering";
import { Slot } from "@app/game-mechanics";

import Node from './node';

type Props = {
    slots: Slot[];
    selected: Slot;
    onDragMove: (comp: PrimitiveContainer) => void;
}

export const SlotsList: RenderFunction<Props> = ({slots, onDragMove}) => {

    const items = slots.map((elem) => {
        return createElement(Node, { data: elem, key: elem.id, onDragMove });
    });

    return createElement('collection', null, items);

}

export default SlotsList;