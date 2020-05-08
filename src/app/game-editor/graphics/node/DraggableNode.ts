import { createElement, RenderFunction, RzDraggable, RzDraggableProps, RzPoint, RzElementPrimitiveProps } from "@app/render-kit";
import { RuntimeWidgetNode } from "@app/game-mechanics";

import NodeFactory, { NodeFactoryProps } from "./Factory";

export type Props = {
  data: RuntimeWidgetNode;
  selected: boolean;
  onDragEnd: (id: number, coords: RzPoint) => void;
  onSelect: (item: RuntimeWidgetNode) => void;
};

export const DraggableNode: RenderFunction<Props> = (props) => {
  const { data, onDragEnd, onSelect, selected } = props;

  return (
    createElement<RzDraggableProps>(
      RzDraggable,
      {
        onDragEnd: (coords) => {
          onDragEnd(data.id, coords);
        },
        startPosition: { x: data.x, y: data.y },
        render: (coords => {

          return (
            createElement<RzElementPrimitiveProps>(
              'container',
              {
                styles: { x: coords.x, y: coords.y },
                id: data.id,
                onPointerDown: () => onSelect(data),
                name: `node_${data.id}`
              },
              createElement<NodeFactoryProps>(
                NodeFactory,
                { data }
              ),
            )
          )
        }),
      },
    )
  )
};

export default DraggableNode;