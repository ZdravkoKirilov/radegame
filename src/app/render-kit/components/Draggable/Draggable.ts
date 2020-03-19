import { Memo } from "../../bases";
import { createElement } from "../../helpers/create-element";
import { RzElementPrimitiveProps, RzPoint, RzNode } from "../../models";
import { GenericEventHandler } from "../../interfaces";

export type RzDraggableProps = {
    onDragEnd: (position: RzPoint) => void;
    onDragMove?: (position: RzPoint) => void;
    startPosition: RzPoint;
    render: (points: RzPoint) => RzNode;
};

export const RzDraggable = Memo<RzDraggableProps>(({ startPosition, onDragEnd, onDragMove, render }, { useRef, useState }) => {
    const dragStartPosition = useRef<RzPoint>();
    const dragStartPositionStatic = useRef<RzPoint>();
    const activeDragPosition = useRef<RzPoint>();
    const [_, forceUpdate] = useState(0);

    const handlePointerDown: GenericEventHandler = event => {
        event.stopPropagation();
        const eventPosition = event.position;
        const dragStart = {
            x: eventPosition.x - startPosition.x,
            y: eventPosition.y - startPosition.y,
        }; // that's the offset inside of the graphic itself. e.g.: click inside the sprite in coordinates 30,25
        dragStartPosition.current = dragStart;
        dragStartPositionStatic.current = { x: startPosition.x, y: startPosition.y };
        activeDragPosition.current = { ...startPosition };
    };

    const handleDragEnd = event => {
        event.stopPropagation();
        if (activeDragPosition.current && dragWasReal(dragStartPositionStatic.current, activeDragPosition.current)) {
            onDragEnd(activeDragPosition.current);
        }
        dragStartPosition.current = null;
        activeDragPosition.current = null;
    };

    const handlePointerMove = event => {
        event.stopPropagation();
        if (dragStartPosition.current) {
            const newPosition = event.position;
            const newPositionWithOffset = {
                x: newPosition.x - dragStartPosition.current.x,
                y: newPosition.y - dragStartPosition.current.y,
            };
            onDragMove && onDragMove(newPositionWithOffset);
            activeDragPosition.current = newPositionWithOffset;
            forceUpdate(prevValue => prevValue++);
        }
    };

    return (
        createElement<RzElementPrimitiveProps>(
            'container',
            {
                onPointerDown: handlePointerDown,
                onPointerMove: handlePointerMove,
                onPointerUp: handleDragEnd,
                onPointerOut: handleDragEnd,
                onPointerUpOutside: handleDragEnd,
                onBlur: handleDragEnd,
            },
            render(activeDragPosition.current || startPosition)
        )
    );
}, ['onDragEnd', 'startPosition', 'render']);


const dragWasReal = (initial: RzPoint, result: RzPoint) => {
    const validDragX = Math.abs(initial.x - result.x) > 0;
    const validDragY = Math.abs(initial.y - result.y) > 0;
    return validDragX && validDragY;
};