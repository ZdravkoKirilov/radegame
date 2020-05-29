import { RenderFunction, RzPoint, RzElementPrimitiveProps } from "../../models";
import { createElement } from "../../helpers";
import { PrimitiveRectangleProps } from "../../primitives";

import { RzDraggableProps, RzDraggable } from "../Draggable";

export type ScrollHandleBarProps = {
  viewportWidth: number;
  viewportHeight: number;

  totalWidth: number;
  totalHeight: number;

  horizontal: boolean;

  startPosition: RzPoint;
  currentPosition: RzPoint;

  onScroll: (point: RzPoint) => void;
}

export const ScrollHandleBar: RenderFunction<ScrollHandleBarProps> = ({ viewportWidth, viewportHeight, totalHeight, totalWidth, startPosition, currentPosition, onScroll, horizontal }) => {

  const globalRatio = viewportHeight / totalHeight;
  const gripHeight = viewportHeight * globalRatio;
  const top = currentPosition.y * globalRatio;

  return createElement<RzElementPrimitiveProps>(
    'container',
    null,
    createElement<PrimitiveRectangleProps>(
      'rectangle',
      {
        styles: {
          x: 0,
          y: 0,
          stroke_thickness: 2,
          stroke_color: '#4287f5',
          fill: '#ffff',
          width: 40,
          height: viewportHeight,
        }
      }
    ),
    createElement<RzDraggableProps>(
      RzDraggable,
      {
        startPosition,
        onDragMove: point => {
          onScroll({
            x: 0,
            y: point.y * (totalHeight / viewportHeight)
          })
        },
        render: () => {
          return createElement<PrimitiveRectangleProps>(
            'rectangle',
            {
              styles: {
                x: 5,
                y: top,
                stroke_thickness: 1,
                stroke_color: '#ffff',
                fill: '#4287f5',
                width: 30,
                height: gripHeight,
                border_radius: 5,
              }
            }
          )
        }
      }
    ),
  );
};