import { RenderFunction, RzPoint, RzElementPrimitiveProps, createElement, RzDraggableProps, RzDraggable } from "../../internal";

export type ScrollingContentProps = {
  startPosition: RzPoint;
  currentPosition: RzPoint;

  onScroll?: (point: RzPoint) => void;
} & any;

export const ScrollingContent: RenderFunction<ScrollingContentProps> = ({ startPosition, currentPosition, children, onScroll }) => {
  return createElement<RzDraggableProps>(
    RzDraggable as any,
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
        ) as any;
      },
      onDragMove: onScroll
    }
  ) as any;
};