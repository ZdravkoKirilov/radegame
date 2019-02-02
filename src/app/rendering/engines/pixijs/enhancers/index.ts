import { interaction, DisplayObject } from 'pixi.js';
import { AbstractEnhancer, Component, RzElementProps } from "@app/rendering";
import { bringToFront } from '../helpers';

type coords = { x: number, y: number };

type Draggable = {
    dragging?: boolean;
    hasMoved?: boolean;
    dragPoint?: any;
    initial?: coords;
}

const dragWasReal = (initial: coords, result: coords): boolean => {
    const validDragX = Math.abs(initial.x - result.x) > 0;
    const validDragY = Math.abs(initial.y - result.y) > 0;
    return validDragX && validDragY;
};

export class PixiEnhancer implements AbstractEnhancer {
    assignEnhancers(comp: Component) {
        this.makeDraggable(comp);
    }
    makeDraggable(comp: Component) {
        if (comp.props.draggable) {
            var closure: Draggable = {};
            var elem = comp.graphic as DisplayObject;

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
}