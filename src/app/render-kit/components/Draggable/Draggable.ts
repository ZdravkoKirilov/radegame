import { Memo } from "../../bases";
import { createElement } from "../../helpers/create-element";
import { RzElementPrimitiveProps, RzPoint } from "../../models";
import { GenericEventHandler } from "../../interfaces";
import { getChildAsRenderFunc } from "../../helpers";

type Props = {
    onDragEnd: (position: RzPoint) => void;
    onDragMove?: (position: RzPoint) => void;
    startPosition: RzPoint;
};

export const RzDraggable = Memo<Props>(({ children, startPosition, onDragEnd, onDragMove }, { useMemo, useState, useEffect }) => {
    const [dragStartPosition, setDragStartPosition] = useState<RzPoint>();
    const [dragPosition, setDragPosition] = useState<RzPoint>();

    useEffect(() => {
        setDragPosition(startPosition);
    }, []);

    const handlePointerDown = useMemo<GenericEventHandler>(event => {
        event.stopPropagation();
        const eventPosition = event.position;
        const dragStart = {
            x: eventPosition.x - startPosition.x,
            y: eventPosition.y - startPosition.y,
        }; // that's the offset inside of the graphic itself. e.g.: click inside the sprite in coordinates 30,25
        setDragStartPosition(dragStart);
        setDragPosition(dragPosition);

    }, [startPosition.x, startPosition.y]);

    const handlePointerUp = useMemo<GenericEventHandler>(event => {
        event.stopPropagation();

        if (dragPosition && (dragPosition.x !== startPosition.x || dragPosition.y !== startPosition.y)) {
            onDragEnd(dragPosition);
            setDragStartPosition(null);
            setDragPosition(null);
        }
    }, []);

    const handlePointerMove = useMemo<GenericEventHandler>(event => {
        event.stopPropagation();

        if (dragStartPosition) {
            const newPosition = event.position;
            const newPositionWithOffset = {
                x: newPosition.x - dragStartPosition.x,
                y: newPosition.y - dragStartPosition.y,
            };
            setDragPosition(newPositionWithOffset);
            onDragMove(newPositionWithOffset);
        }
    }, []);

    const childFunction = getChildAsRenderFunc<RzPoint>(children);

    return (
        createElement<RzElementPrimitiveProps>(
            'container',
            {
                onPointerDown: handlePointerDown,
                onPointerMove: handlePointerMove,
                onPointerUp: handlePointerUp,
            },
            childFunction(dragPosition || startPosition)
        )
    );
}, ['onDragEnd']);