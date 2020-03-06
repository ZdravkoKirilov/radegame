import { DisplayObject, interaction } from "pixi.js";
import {
    AbstractEventManager, BasicComponent, Component, GenericEvent, propagateEvent,
    GenericEventHandler,
    withErrorPropagation
} from "@app/render-kit";
import { createGenericEventFromPixiEvent } from "../helpers";

export const PixiSupportedEvents = {
    click: 'click',
    mousedown: 'mousedown',
    mousemove: 'mousemove',
    mouseout: 'mouseout',
    mouseover: 'mouseover',
    mouseup: 'mouseup',
    mouseupoutside: 'mouseupoutside',
    pointercancel: 'pointercancel',
    pointerdown: 'pointerdown',
    pointermove: 'pointermove',
    pointerout: 'pointerout',
    pointerover: 'pointerover',
    pointertap: 'pointertap',
    pointerup: 'pointerup',
    pointerupoutside: 'pointerupoutside',
    rightclick: 'rightclick',
    rightdown: 'rightdown',
    rightup: 'rightup',
    tap: 'tap',
    touchcancel: 'touchcancel',
    touchend: 'touchend',
    touchendoutside: 'touchendoutside',
    touchstart: 'touchstart',

    // non pixi native events
    wheel: 'wheel',
    keypress: 'keypress',
    focus: 'focus',
} as const;

type PixiEventType = keyof typeof PixiSupportedEvents;
type ComponentEvents = Map<Component, GenericEventHandler>;
type TrackData = { handler: Function, graphic: DisplayObject };

export class PixiDelegationEventsManager implements AbstractEventManager {

    constructor(private interactionManager: interaction.InteractionManager) {
        window.addEventListener("wheel", this.onMouseWheel, { passive: true });
        window.addEventListener("keypress", this.onKeypress);
        this.interactionManager.on('pointerdown', this.onGraphicClick);
    }

    registeredEvents: Map<PixiEventType, ComponentEvents> = new Map();

    getEventBranchForType = (type: PixiEventType) => {
        const branch = this.registeredEvents.get(type) || new Map<Component, GenericEventHandler>();
        return branch;
    }

    createEventTracking = (eventType: PixiEventType, branch: ComponentEvents, eventHandlerName: string) => {
        if (branch.size < 2) {
            this.interactionManager.on(eventType, (event: interaction.InteractionEvent) => {
                const currentBranch: ComponentEvents = this.registeredEvents[eventType];
                currentBranch.forEach((handler, component) => {
                    const genericEvent = createGenericEventFromPixiEvent(
                        event, eventType, component
                    );
                    withErrorPropagation(component, () => handler(genericEvent));
                    propagateEvent(genericEvent, eventHandlerName);
                });
            });
        }
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

    elementWithWheel: TrackData;
    elementWithKeyboard: TrackData;
    focused: BasicComponent;

    assignEvents(comp: BasicComponent) {
        const graphic = comp.graphic as DisplayObject;

        Object.keys(comp.props).forEach((key: string) => {
            if (key.startsWith('on') && typeof comp.props[key] === 'function') {
                const handler: GenericEventHandler = comp.props[key];
                const eventName = key.slice(2).toLowerCase() as PixiEventType; //TODO event name mapping here
                const branch = this.getEventBranchForType(eventName);

                const genericHandler = (event: GenericEvent) => {
                    handler(event);
                };
                const wheelHandler = (event: GenericEvent) => {
                    event.stopPropagation();
                    const data = { handler, graphic };
                    this.elementWithWheel = data;
                };
                const keypressHandler = (event: GenericEvent) => {
                    event.stopPropagation();
                    const data = { handler, graphic };
                    this.elementWithKeyboard = data;
                };
                const focusHandler = (event: GenericEvent) => {
                    event.stopPropagation();
                    if (this.focused && this.focused !== comp && this.focused.props.onBlur) {
                        this.focused.props.onBlur();
                    }
                    if (this.focused !== comp) {
                        this.focused = comp;
                        comp.props.onFocus();
                    }
                };

                if (eventName in PixiSupportedEvents && graphic) {
                    graphic.interactive = true;
                    branch.set(comp, genericHandler);
                    this.createEventTracking(eventName, branch, key);
                }

                if (eventName === 'wheel' && graphic) {
                    graphic.interactive = true;
                    branch.set(comp, wheelHandler);
                }

                if (eventName === 'keypress' && graphic) {
                    graphic.interactive = true;
                    branch.set(comp, keypressHandler);
                }

                if (eventName === 'focus' && graphic) {
                    graphic.interactive = true;
                    branch.set(comp, focusHandler);
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

    removeListeners(comp: BasicComponent) {
        this.registeredEvents.forEach(eventCategory => {
            eventCategory.delete(comp);
        });
    }

    onDestroy() {
        window.removeEventListener('wheel', this.onMouseWheel);
        window.removeEventListener('keypress', this.onKeypress);
        this.interactionManager.removeAllListeners();
    }
}