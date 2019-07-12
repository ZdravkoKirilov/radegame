import { AbstractEvent, BasicComponent } from "@app/render-kit";
import { DisplayObject, interaction } from "pixi.js";

type TrackData = { handler: Function, graphic: DisplayObject };
type HandlerData = {
    type: interaction.InteractionEventTypes;
    handler: (event: interaction.InteractionEvent) => void;
};
export class PixiEventsManager implements AbstractEvent {

    constructor(private interactionManager: interaction.InteractionManager) {
        window.addEventListener("wheel", this.onMouseWheel);
        window.addEventListener("keypress", this.onKeypress);
        this.interactionManager.on('pointerdown', this.onGraphicClick);
    }

    onMouseWheel = (event: MouseWheelEvent) => {
        event.stopPropagation();
        const delta = Math.sign(event.deltaY);
        if (this.elementWithWheel) {
            this.elementWithWheel.handler(delta);
        }
    }

    onKeypress = (event: KeyboardEvent) => {
        if (this.elementWithKeyboard) {
            event.stopPropagation();
            event.preventDefault();
            this.elementWithKeyboard.handler(event);
        }
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

    elementWithWheel: TrackData;
    elementWithKeyboard: TrackData;
    focused: BasicComponent;
    compEvents: Map<BasicComponent, Set<HandlerData>> = new Map();

    assignEvents(comp: BasicComponent) {
        const graphic = comp.graphic as DisplayObject;
        const newHandlers: Set<HandlerData> = new Set();
        Object.keys(comp.props).forEach((key: string) => {
            if (graphic && key.startsWith('on') && typeof comp.props[key] === 'function') {
                const handler: Function = comp.props[key];
                const eventName = key.slice(2).toLowerCase();
                const genericHandler = (event: interaction.InteractionEvent) => {
                    handler(event, comp);
                };
                const wheelHandler = (event: interaction.InteractionEvent) => {
                    event.stopPropagation();
                    const data = { handler, graphic };
                    this.elementWithWheel = data;
                };
                const keypressHandler = (event: interaction.InteractionEvent) => {
                    event.stopPropagation();
                    const data = { handler, graphic };
                    this.elementWithKeyboard = data;
                };
                const focusHandler = (event: interaction.InteractionEvent) => {
                    event.stopPropagation();
                    if (this.focused && this.focused !== comp && this.focused.props.onBlur) {
                        this.focused.props.onBlur();
                    }
                    if (this.focused !== comp) {
                        this.focused = comp;
                        comp.props.onFocus();
                    }
                };

                if (this.supported.has(eventName) && graphic) {
                    graphic.on(eventName as interaction.InteractionEventTypes, genericHandler);
                    graphic.interactive = true;

                    if (comp.props.button) {
                        graphic.buttonMode = true;
                    }
                    newHandlers.add({
                        type: eventName as interaction.InteractionEventTypes,
                        handler: genericHandler,
                    });
                }

                if (eventName === 'wheel' && graphic) {
                    graphic.interactive = true;
                    if (comp.props.button) {
                        graphic.buttonMode = true;
                    }
                    graphic.on('pointerdown', wheelHandler);
                    newHandlers.add({
                        type: 'pointerdown',
                        handler: wheelHandler,
                    });
                }

                if (eventName === 'keypress' && graphic) {
                    graphic.interactive = true;
                    if (comp.props.button) {
                        graphic.buttonMode = true;
                    }
                    graphic.on('pointerdown', keypressHandler);
                    newHandlers.add({
                        type: 'pointerdown',
                        handler: keypressHandler,
                    });
                }

                if (eventName === 'focus' && graphic) {
                    graphic.interactive = true;
                    if (comp.props.button) {
                        graphic.buttonMode = true;
                    }
                    graphic.on('pointerdown', focusHandler);
                    newHandlers.add({
                        type: 'pointerdown',
                        handler: focusHandler,
                    });
                }
            }
        });
        this.compEvents.set(comp, newHandlers);
    }

    onGraphicClick = (event: interaction.InteractionEvent) => {
        const target = event.currentTarget as DisplayObject & { component: BasicComponent };
        const comp = target ? target.component : null;
        const withWheel = this.elementWithWheel ? this.elementWithWheel.graphic : null;
        const withKeyboard = this.elementWithKeyboard ? this.elementWithKeyboard.graphic : null;

        if (target !== withWheel) {
            this.elementWithWheel = null;
        }
        if (target !== withKeyboard) {
            this.elementWithKeyboard = null;
        }

        if (this.focused && this.focused !== comp && this.focused.props.onBlur) {
            this.focused.props.onBlur();
        }
    }

    removeListeners(comp: BasicComponent) {
        const graphic = comp.graphic as DisplayObject;
        const cachedHandlers = this.compEvents.get(comp) || new Set();
        cachedHandlers.forEach(elem => {
            graphic.off(elem.type, elem.handler);
        });
    }

    onDestroy() {
        window.removeEventListener('wheel', this.onMouseWheel);
        window.removeEventListener('keypress', this.onKeypress);
        this.interactionManager.off('pointerdown', this.onGraphicClick);
    }
}