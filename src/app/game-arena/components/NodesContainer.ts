import { StatefulComponent, createElement, RzElementChild, RenderFunction, PrimitiveContainer } from "@app/rendering";
import { Node } from "./Node";

type Props = {
    nodes: Array<any>;
    children?: RzElementChild;
    render: (lineWidth: number) => RzElementChild;
    onDragMove: (comp: PrimitiveContainer) => void;
};

export const NodesContainer: RenderFunction<Props> = (props) => {

    const items = props.nodes.map((elem) => {
        return createElement(Node, { ...elem, key: elem.id, onDragMove: props.onDragMove });
    });

    return createElement('collection', null, items);

};
