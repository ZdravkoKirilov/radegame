import { RenderFunction, createElement, PrimitiveContainer } from "@app/rendering";
import { Slot, ImageAsset } from "@app/game-mechanics";

import Node, { Props as NodeProps } from './node';

export type Props = {
    slots: Slot[];
    selected: Slot;
    images: ImageAsset[];
    onDragMove: (comp: PrimitiveContainer) => void;
    onDragEnd: (id: number) => void;
    selectSlot: (item: Slot) => void;
}

export const SlotsList: RenderFunction<Props> = ({ slots, images, selected, onDragMove, onDragEnd, selectSlot }) => {

    const items = slots.map(elem => {
        const image = images.find(img => elem.image === img.id);

        return createElement<NodeProps>(Node, {
            data: elem, key: elem.id, onDragMove,
            image: image ? image.thumbnail || image.svg : '',
            onDragEnd: () => onDragEnd(elem.id),
            onSelect: selectSlot,
            selected: selected && selected.id === elem.id,
        });
    });

    return createElement('collection', null, items);

}

export default SlotsList;