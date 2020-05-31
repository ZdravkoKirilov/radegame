import {
  BasicComponent, createElement, RzElementPrimitiveProps, RzPoint, RzNode, RenderFunction,
} from '../../internal';

import {  RzScrollBoundary, enforceBoundary, scrollWasReal } from './helpers';
import { ScrollHandleBar, ScrollHandleBarProps } from "./ScrollHandleBar";
import { ScrollingContentProps, ScrollingContent } from "./ScrollingContent";

export type RzScrollableProps = {
  width: number;
  height: number;
  boundary?: RzScrollBoundary;
  horizontal?: boolean;
  swipeContent?: boolean;

  renderBar?: (data: ScrollHandleBarProps) => RzNode;

  controlledPosition?: RzPoint;
  controlledStartPosition?: RzPoint;
  onScroll?: (points: RzPoint) => void;
}

export const RzScrollable: RenderFunction<RzScrollableProps> = (
  { width, height, horizontal = false, controlledPosition, controlledStartPosition, swipeContent, renderBar, boundary, onScroll, children },
  { useRef, useState, useEffect }) => {

  const lastScrollPosition = useRef<RzPoint>({
    x: boundary?.minX || 0,
    y: boundary?.minY || 0,
  });
  const [currentScrollPosition, setScrollPosition] = useState<RzPoint>({
    x: boundary?.minX || 0,
    y: boundary?.minY || 0,
  });
  const [totalHeight, setTotalHeight] = useState(height);

  useEffect(() => {
    if (controlledPosition) {
      setScrollPosition(controlledPosition);
      lastScrollPosition.current = controlledPosition;
    }
  }, [controlledPosition]);

  const handleBarProps: ScrollHandleBarProps = {
    viewportHeight: height,
    totalHeight,
    startPosition: controlledStartPosition || { x: 0, y: 0 },
    currentPosition: currentScrollPosition,
    onScroll: point => {
      const withBoundary = enforceBoundary(point, boundary);
      if (scrollWasReal(withBoundary, lastScrollPosition.current)) {
        onScroll(withBoundary);
        setScrollPosition(withBoundary);
        lastScrollPosition.current = withBoundary;
      }
    }
  }

  return createElement<RzElementPrimitiveProps>(
    'container',
    {
      styles: { x: 0, y: 0, mask: [0, 0, width, height] },
      name: 'OuterScrollWrapper'
    },
    createElement<RzElementPrimitiveProps>(
      'container',
      {
        ref: component => {
          const dimensions = (component as BasicComponent).getSize();
          if (dimensions) {
            setTotalHeight(dimensions.height);
          }
        },
      },
      createElement<ScrollingContentProps>(
        ScrollingContent,
        {
          startPosition: controlledStartPosition || { x: 0, y: 0 },
          currentPosition: currentScrollPosition,
          onScroll: swipeContent ? point => {
            const withBoundary = enforceBoundary(point, boundary);
            if (scrollWasReal(withBoundary, lastScrollPosition.current)) {
              onScroll(withBoundary);
              setScrollPosition(withBoundary);
              lastScrollPosition.current = withBoundary;
            }
          } : null,
        },
        children,
      ),
    ),
    createElement<RzElementPrimitiveProps>(
      'container',
      { styles: { x: width, y: 0 } },
      renderBar ? renderBar(handleBarProps) : createElement<ScrollHandleBarProps>(
        ScrollHandleBar,
        handleBarProps,
      )
    )
  );
};