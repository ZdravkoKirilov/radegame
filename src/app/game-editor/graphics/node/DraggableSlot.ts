import { createElement, RenderFunction, RzDraggable, RzDraggableProps, RzPoint, RzElementPrimitiveProps } from "@app/render-kit";
import { RuntimeSlot } from "@app/game-mechanics";

import NodeFactory, { NodeFactoryProps } from "./Factory";

export type Props = {
  data: RuntimeSlot;
  selected: boolean;
  onDragEnd: (id: number, coords: RzPoint) => void;
  onSelect: (item: RuntimeSlot) => void;
};

export const DraggableSlot: RenderFunction<Props> = (props) => {
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

export default DraggableSlot;