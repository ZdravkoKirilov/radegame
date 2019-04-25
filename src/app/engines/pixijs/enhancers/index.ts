import { interaction, DisplayObject } from 'pixi.js';
import { AbstractEnhancer, Component, RzElementProps, ScrollableConfig } from "@app/rendering";
import { bringToFront } from '../helpers';
import { evaluate } from '@app/dynamic-forms';

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
    config: ScrollableConfig,
    comp: Component,
) => {
    const { xThreshold, yThreshold, minX, maxX, minY, maxY } = config;
    let validDragX = Math.abs(initial.x - result.x) > xThreshold;
    let validDragY = Math.abs(initial.y - result.y) > yThreshold;
    let minYValid = true;
    let maxYValid = true;
    let minXValid = true;
    let maxXValid = true;

    const context = {
        width: comp.graphic.width,
        height: comp.graphic.height,
        y: comp.graphic.y,
        x: comp.graphic.x,
    };

    if (minX) {
        minXValid = result.x >= evaluate(minX, context);
    }

    if (maxX) {
        maxXValid = result.x <= evaluate(maxX, context);
    }

    if (minY) {
        minYValid = result.y >= evaluate(minY, context);
    }

    if (maxY) {
        maxYValid = result.y <= evaluate(maxY, context);
    }


    return {
        x: validDragX && minXValid && maxXValid,
        y: validDragY && minYValid && maxYValid
    };
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
                closure.dragging = !comp['scrolling'];
                closure.initial = { x: comp.graphic.x, y: comp.graphic.y };
                bringToFront(elem);
                comp['dragging'] = true;
            });

            elem.on('pointerup', (event: interaction.InteractionEvent) => {
                event.stopPropagation();
                closure.dragging = false;
                closure.hasMoved = false;
                closure.dragPoint = null;
                delete comp['dragging'];
                const { x, y } = comp.props.styles;

                if (dragWasReal(closure.initial, { x, y })) {
                    comp.props.onDragEnd && comp.props.onDragEnd(comp);
                }
            });

            elem.on('pointermove', (event: interaction.InteractionEvent) => {
                // event.stopPropagation();
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
                closure.dragging = !comp['dragging'];
                closure.initial = { x: comp.graphic.x, y: comp.graphic.y };
                comp['scrolling'] = true;
            });

            elem.on('pointerupoutside', (event: interaction.InteractionEvent) => {
                event.stopPropagation();
                closure.dragging = false;
                closure.hasMoved = false;
                closure.dragPoint = null;
                delete comp['scrolling'];

                if (comp.props.onScrollEnd) {
                    comp.props.onScrollEnd(comp);
                }
            });

            elem.on('pointerup', (event: interaction.InteractionEvent) => {
                event.stopPropagation();
                closure.dragging = false;
                closure.hasMoved = false;
                closure.dragPoint = null;
                delete comp['scrolling'];

                if (comp.props.onScrollEnd) {
                    comp.props.onScrollEnd(comp);
                }
            });

            elem.on('pointermove', (event: interaction.InteractionEvent) => {
                // event.stopPropagation();
                if (closure.dragging) {
                    const newPos = event.data.getLocalPosition(comp.graphic.parent);
                    const passedPos = {} as any;
                    const isValid = getThresholdState(
                        closure.initial,
                        {
                            x: newPos.x - closure.dragPoint.x,
                            y: newPos.y - closure.dragPoint.y
                        },
                        comp.props.scrollable, comp
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