import { createElement, Memo } from "@app/render-kit";
import FacadeSlot, { EnhancedSlotFacadeProps } from './facade-slot';
import { RuntimeSlot } from "../../entities";

export type Props = {
    data: RuntimeSlot;
};

export const Node = Memo<Props>(
    ({ data }) => {
        return createElement(
            'container',
            {
                styles: { x: data.x, y: data.y },
                id: data.id,
                name: `node_${data.id}`
            },
            createElement<EnhancedSlotFacadeProps>(FacadeSlot, { data }),
        );
    },
    ['data'],
);

export default Node;