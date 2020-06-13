import { createElement, RenderFunction, RzDraggable, RzDraggableProps, RzPoint, RzElementPrimitiveProps } from "@app/render-kit";
import { RuntimeWidgetNode, NodeFactory, NodeFactoryProps, combineStyles } from "@app/game-mechanics";

export type Props = {
  data: RuntimeWidgetNode;
  selected: boolean;
  onDragEnd: (id: number, coords: RzPoint) => void;
  onSelect: (item: RuntimeWidgetNode) => void;
};

export const DraggableNode: RenderFunction<Props> = (props) => {
  const { data, onDragEnd, onSelect, selected } = props;
  const nodeStyle = combineStyles(data);

  return (
    createElement<RzDraggableProps>(
      RzDraggable,
      {
        onDragEnd: (coords) => {
          onDragEnd(data.id, coords);
        },
        startPosition: { x: nodeStyle.x, y: nodeStyle.y },
        render: (coords => {

          return (
            createElement<RzElementPrimitiveProps>(
              'container',
              {
                styles: { x: coords.x, y: coords.y },
                id: data.id,
                onPointerDown: () => onSelect(data),
                name: `dragNode_${data.id}`
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