import { createElement } from "../../helpers";
import { RzElementPrimitiveProps, RzPoint, RzNode, RenderFunction } from "../../models";
import { ScrollHandleBar, ScrollHandleBarProps } from "./ScrollHandleBar";
import { ScrollingContentProps, ScrollingContent } from "./ScrollingContent";
import { RzScrollBoundary, enforceBoundary, scrollWasReal } from "./helpers";

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

  useEffect(() => {
    if (controlledPosition) {
      setScrollPosition(controlledPosition);
      lastScrollPosition.current = controlledPosition;
    }
  }, [controlledPosition]);

  const handleBarProps: ScrollHandleBarProps = {
    viewportWidth: width,
    viewportHeight: height, horizontal,
    totalWidth: 0,
    totalHeight: 0,
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
    { styles: { x: 0, y: 0, mask: [0, 0, width, height] }, name: 'OuterScrollWrapper' },
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
    createElement<RzElementPrimitiveProps>(
      'rectangle',
      { styles: { x: width, y: 0 } },
      renderBar ? renderBar(handleBarProps) : createElement<ScrollHandleBarProps>(
        ScrollHandleBar,
        handleBarProps,
      )
    )
  );
};