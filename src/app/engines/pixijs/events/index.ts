import { AbstractEvent, Component } from "@app/rendering";
import { DisplayObject, interaction } from "pixi.js";

export class PixiEventsManager implements AbstractEvent {

    constructor() {
        window.addEventListener("wheel", this.onDestroy);
        window.addEventListener("keypress", this.onKeypress);
    }

    onMouseWheel = (event: MouseWheelEvent) => {
        const delta = Math.sign(event.deltaY);
        this.graphicsWithWheel.forEach(({ handler }) => {
            handler(delta);
        });
    }

    onKeypress = (event: KeyboardEvent) => {
        this.graphicsWithKeyboard.forEach(({ handler }) => {
            handler(event);
        });
    }

    supported = new Set([
        'click',
        'mousedown',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'mouseupoutside',
        'pointercancel',
        'pointerdown',
        'pointermove',
        'pointerout',
        'pointerover',
        'pointertap',
        'pointerup',
        'pointerupoutside',
        'rightclick',
        'rightdown',
        'rightup',
        'tap',
        'touchcancel',
        'touchend',
        'touchendoutside',
        'touchstart',
    ]);

    graphicsWithWheel = new Set<{ handler: Function }>();
    graphicsWithKeyboard = new Set<{ handler: Function }>();

    assignEvents(comp: Component) {
        Object.keys(comp.props).forEach((key: string) => {
            if (key.startsWith('on') && typeof comp.props[key] === 'function') {
                const handler: Function = comp.props[key];
                const eventName = key.slice(2).toLowerCase();
                const graphic = comp.graphic as DisplayObject;

                if (this.supported.has(eventName) && graphic) {
                    graphic.on(eventName as interaction.InteractionEventTypes, event => {
                        handler(event, comp);
                    });
                    graphic.interactive = true;

                    if (comp.props.button) {
                        graphic.buttonMode = true;
                    }
                }

                if (eventName === 'wheel') {
                    const data = { handler };

                    graphic.on('mousedown', event => {
                        this.graphicsWithWheel.add(data);
                    });

                    graphic.on('mouseup', event => {
                        this.graphicsWithWheel.delete(data);
                    });
                }
            }
        });
    }

    onDestroy() {
        window.removeEventListener('wheel', this.onMouseWheel);
    }
}