import { RuntimeSlot } from "@app/game-mechanics";
import { RenderFunction, Memo, createElement } from "@app/render-kit";
import Node, { Props as NodeProps } from "../slot";

export type Props = {
    slots: RuntimeSlot[];
}

export const SlotsList: RenderFunction<Props> = Memo(({ slots }) => {
    const items = slots.map(elem => {
        return createElement<NodeProps>(Node, {
            data: elem, key: elem.id,
        });
    });

    return (
        createElement(
            'collection',
            {
                styles: { z_order: 1 }
            },
            items
        )
    );
}, ['slots']);