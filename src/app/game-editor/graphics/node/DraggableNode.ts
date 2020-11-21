import { createElement, RenderFunction, RzElementPrimitiveProps } from "@app/render-kit";
import { RuntimeWidgetNode, NodeFactory, NodeFactoryProps, combineStyles, WidgetNodeId } from "@app/game-mechanics";

export type Props = {
  data: RuntimeWidgetNode;
  selected: boolean;
  onDragEnd: (id: WidgetNodeId, coords: any) => void;
  onSelect: (item: RuntimeWidgetNode) => void;
};

export const DraggableNode: RenderFunction<Props> | any = (props: any) => {
  const { data, onDragEnd, onSelect } = props;
  const nodeStyle = combineStyles(data);

  return (
    createElement<any>(
      {} as any, //RzDraggable,
      {
        onDragEnd: (coords: any) => {
          onDragEnd(data.id, coords);
        },
        startPosition: { x: nodeStyle.x, y: nodeStyle.y },
        render: ((coords: any) => {

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
                NodeFactory as any,
                { data }
              ) as any,
            )
          )
        }),
      },
    )
  )
};

export default DraggableNode;