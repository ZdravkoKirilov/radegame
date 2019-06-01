import { createElement, PrimitiveContainer, Memo } from "@app/render-kit";
import { Slot, ImageAsset, Style, Source } from "@app/game-mechanics";

import Node, { Props as NodeProps } from './node';

export type Props = {
    slots: Slot[];
    selected: Slot;
    images: ImageAsset[];
    sources: Source[];
    styles: Style[];
    onDragMove: (comp: PrimitiveContainer) => void;
    onDragEnd: (id: number) => void;
    selectSlot: (item: Slot) => void;
}

export const SlotsList = Memo<Props>(
    ({ slots, images, sources = [], styles, selected, onDragMove, onDragEnd, selectSlot, key }) => {
        const items = slots.map(elem => {
            const image = images.find(img => elem.image === img.id);
            const source = sources.find(src => src.id === elem.draw);
            const style = styles.find(style => style.id === elem.style);
            return createElement<NodeProps>(Node, {
                data: elem, key: elem.id, onDragMove,
                style,
                image: image ? image.thumbnail || image.svg : '',
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