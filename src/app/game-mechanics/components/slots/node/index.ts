import { createElement, PrimitiveContainer, Points, Memo } from "@app/render-kit";
import { Slot } from "@app/game-mechanics";
import StaticNode, { Props as StaticNodeProps } from './static-node';

export type Props = {
    data: Slot;
};

export const Node = Memo<Props>(
    (props) => {
        const { data } = props;

        return createElement(
            'container',
            {
                styles: { x: data.x, y: data.y },
                id: data.id,
                name: `node_${data.id}`
            },
            createElement<StaticNodeProps>(StaticNode, { data })
        );
    },
    ['data'],
);

export default Node;