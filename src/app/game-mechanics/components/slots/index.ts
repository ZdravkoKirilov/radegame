import { Slot } from "../../entities";
import { RenderFunction, Memo, createElement } from "@app/render-kit";
import Node, { Props as NodeProps } from "./node";

export type Props = {
    slots: Slot[];
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
            null,
            items
        )
    );
}, ['slots']);