import { RenderFunction, RzPoint, RzElementPrimitiveProps } from "../../models";
import { createElement } from "../../helpers";
import { RzDraggableProps, RzDraggable } from "../Draggable";

export type ScrollingContentProps = {
  startPosition: RzPoint;
  currentPosition: RzPoint;

  onScroll?: (point: RzPoint) => void;
}

export const ScrollingContent: RenderFunction<ScrollingContentProps> = ({ startPosition, currentPosition, children, onScroll }) => {
  return createElement<RzDraggableProps>(
    RzDraggable,
    {
      startPosition,
      render: () => {
        return createElement<RzElementPrimitiveProps>(
          'container',
          {
            styles: { x: currentPosition.x, y: currentPosition.y },
            name: 'InnerScrollWrapper'
          },
          children,
        );
      },
      onDragMove: onScroll
    }
  );
};