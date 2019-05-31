import { AbstractEvent, BasicComponent } from "@app/render-kit";
import { DisplayObject, interaction } from "pixi.js";

type TrackData = { handler: Function, graphic: DisplayObject };
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

    assignEvents(comp: BasicComponent) {
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

                if (eventName === 'wheel' && graphic) {
                    graphic.interactive = true;
                    if (comp.props.button) {
                        graphic.buttonMode = true;
                    }
                    const data = { handler, graphic };
                    graphic.on('pointerdown', event => {
                        event.stopPropagation();
                        this.elementWithWheel = data;
                    });
                }

                if (eventName === 'keypress' && graphic) {
                    graphic.interactive = true;
                    if (comp.props.button) {
                        graphic.buttonMode = true;
                    }
                    const data = { handler, graphic };
                    graphic.on('pointerdown', event => {
                        event.stopPropagation();
                        this.elementWithKeyboard = data;
                    });
                }

                if (eventName === 'focus' && graphic) {
                    graphic.interactive = true;
                    if (comp.props.button) {
                        graphic.buttonMode = true;
                    }
                    graphic.on('pointerdown', event => {
                        event.stopPropagation();
                        if (this.focused && this.focused !== comp && this.focused.props.onBlur) {
                            this.focused.props.onBlur();
                        }
                        if (this.focused !== comp) {
                            this.focused = comp;
                            comp.props.onFocus();
                        }
                    });
                }
            }
        });
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

    onDestroy() {
        window.removeEventListener('wheel', this.onMouseWheel);
        window.removeEventListener('keypress', this.onKeypress);
        this.interactionManager.off('pointerdown', this.onGraphicClick);
    }
}