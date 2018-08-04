import { interaction, DisplayObject } from 'pixi.js-legacy';
import { AbstractEnhancer, Component, RzElementProps } from "@app/rendering";
import { bringToFront } from '../helpers';

type Draggable = {
    dragging?: boolean;
    hasMoved?: boolean;
    dragPoint?: any;
}

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
                bringToFront(elem);
            });

            elem.on('pointerup', (event: interaction.InteractionEvent) => {
                event.stopPropagation();
                const props: RzElementProps = {
                    styles: {
                        alpha: 1
                    }
                };
                comp.setProps(props);
                closure.dragging = false;
                closure.hasMoved = false;
                closure.dragPoint = null;
                comp.props.onDragEnd && comp.props.onDragEnd(comp);
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