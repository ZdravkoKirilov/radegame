import { interaction, DisplayObject } from 'pixi.js';
import { AbstractEnhancer, Component, RzElementProps } from "@app/rendering";
import { bringToFront } from '../helpers';

type Coords = { x: number, y: number };

type Draggable = {
    dragging?: boolean;
    hasMoved?: boolean;
    dragPoint?: any;
    initial?: Coords;
}

const dragWasReal = (initial: Coords, result: Coords): boolean => {
    const validDragX = Math.abs(initial.x - result.x) > 0;
    const validDragY = Math.abs(initial.y - result.y) > 0;
    return validDragX && validDragY;
};

const getThresholdState = (
    initial: Coords,
    result: Coords,
    xThreshold: number,
    yThreshold: number
) => {
    const validDragX = Math.abs(initial.x - result.x) > xThreshold;
    const validDragY = Math.abs(initial.y - result.y) > yThreshold;
    return { x: validDragX, y: validDragY };
};

export class PixiEnhancer implements AbstractEnhancer {
    assignEnhancers(comp: Component) {
        this.makeDraggable(comp);
        this.makeScrollable(comp);
    }
    makeDraggable(comp: Component) {
        if (comp.props.draggable) {
            const closure: Draggable = {};
            const elem = comp.graphic as DisplayObject;

            elem.interactive = true;
            elem.buttonMode = true;

            elem.on('pointerdown', (event: interaction.InteractionEvent) => {
                event.stopPropagation();
                closure.dragPoint = event.data.getLocalPosition(comp.graphic.parent);
                closure.dragPoint.x -= comp.graphic.x;
                closure.dragPoint.y -= comp.graphic.y;
                closure.dragging = true;
                closure.initial = { x: comp.graphic.x, y: comp.graphic.y };
                bringToFront(elem);
            });

            elem.on('pointerup', (event: interaction.InteractionEvent) => {
                event.stopPropagation();
                closure.dragging = false;
                closure.hasMoved = false;
                closure.dragPoint = null;
                const { x, y } = comp.props.styles;

                if (dragWasReal(closure.initial, { x, y })) {
                    comp.props.onDragEnd && comp.props.onDragEnd(comp);
                }
            });

            elem.on('pointermove', (event: interaction.InteractionEvent) => {
                event.stopPropagation();
                if (closure.dragging) {
                    const newPos = event.data.getLocalPosition(comp.graphic.parent);
                    const props: RzElementProps = {
                        styles: {
                            x: newPos.x - closure.dragPoint.x,
                            y: newPos.y - closure.dragPoint.y
                        }
                    };
                    comp.setProps(props);
                    closure.hasMoved = true;
                    comp.props.onDragMove && comp.props.onDragMove(comp);
                }
            });

        }
    }

    makeScrollable(comp: Component) {
      
        if (comp.props.scrollable) {
            const closure: Draggable = {};
            const elem = comp.graphic as DisplayObject;
            const { xThreshold, yThreshold } = comp.props.scrollable;

            elem.interactive = true;
            elem.buttonMode = true;

            elem.on('pointerdown', (event: interaction.InteractionEvent) => {
                event.stopPropagation();
                closure.dragPoint = event.data.getLocalPosition(comp.graphic.parent);

                closure.dragPoint.x -= comp.graphic.x;
                closure.dragPoint.y -= comp.graphic.y;
                closure.dragging = true;
                closure.initial = { x: comp.graphic.x, y: comp.graphic.y };
            });

            elem.on('pointerup', (event: interaction.InteractionEvent) => {
                event.stopPropagation();
                closure.dragging = false;
                closure.hasMoved = false;
                closure.dragPoint = null;

                if (comp.props.onScrollEnd) {
                    comp.props.onScrollEnd(comp);
                }
            });

            elem.on('pointermove', (event: interaction.InteractionEvent) => {
                event.stopPropagation();
                if (closure.dragging) {
                    const newPos = event.data.getLocalPosition(comp.graphic.parent);
                    const passedPos = {} as any;
                    const isValid = getThresholdState(
                        closure.initial,
                        {
                            x: newPos.x - closure.dragPoint.x,
                            y: newPos.y - closure.dragPoint.y
                        },
                        xThreshold,
                        yThreshold
                    )

                    if (xThreshold && isValid.x) {
                        passedPos.x = newPos.x - closure.dragPoint.x;
                    }

                    if (yThreshold && isValid.y) {
                        passedPos.y = newPos.y - closure.dragPoint.y;
                    }

                    if (isValid.x || isValid.y) {
                        closure.hasMoved = true;
                        comp.props.onScroll(passedPos);
                    }
                }
            });

        }
    }
}