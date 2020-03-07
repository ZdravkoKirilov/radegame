import { DisplayObject, interaction } from "pixi.js";
import {
    AbstractEventManager, BasicComponent, Component, GenericEvent, propagateEvent,
    GenericEventHandler,
    withErrorPropagation,
    isGenericEventType,
    RzEventTypes,
    isDescendantOf
} from "@app/render-kit";
import { createGenericEventFromPixiEvent } from "../helpers";
import { PixiSupportedEvents, toPixiEvent, toGenericEvent } from "./helpers";

type ComponentEvents = Map<Component, GenericEventHandler>;
type TrackData = { handler: GenericEventHandler, component: BasicComponent };

export class PixiDelegationEventsManager implements AbstractEventManager {

    elementWithWheel: TrackData;
    elementWithKeyboard: TrackData;
    focused: BasicComponent;
    registeredEvents: Map<RzEventTypes, ComponentEvents> = new Map();

    constructor(private interactionManager: interaction.InteractionManager) {
        window.addEventListener("wheel", this.onMouseWheel, { passive: true });
        window.addEventListener("keypress", this.onKeypress);
        this.interactionManager.on('pointerdown', this.onGraphicClick);
    }

    assignEvents(comp: BasicComponent) {
        const graphic = comp.graphic as DisplayObject;

        Object.keys(comp.props).forEach((genericEventType) => {
            if (graphic && isGenericEventType(genericEventType)) {
                const handler: GenericEventHandler = comp.props[genericEventType];
                const eventName = toPixiEvent(genericEventType);
                const branch = this.getEventBranchForType(genericEventType);

                const genericHandler = (event: GenericEvent) => {
                    handler(event);
                };
                const wheelHandler = (event: GenericEvent) => {
                    event.stopPropagation();
                    const data = { handler, component: comp };
                    this.elementWithWheel = data;
                };
                const keypressHandler = (event: GenericEvent) => {
                    event.stopPropagation();
                    const data = { handler, component: comp };
                    this.elementWithKeyboard = data;
                };
                const focusHandler = (event: GenericEvent) => {
                    event.stopPropagation();
                    if (this.focused && this.focused !== comp && this.focused.props.onBlur) {
                        const { handler, component } = this.elementWithWheel;
                        const fakeNativeEvent = { target: { component } } as any;
                        const genericEvent = createGenericEventFromPixiEvent(fakeNativeEvent, RzEventTypes.onBlur, component);
                        withErrorPropagation(component, () => handler(genericEvent));
                        propagateEvent(genericEvent, RzEventTypes.onBlur);
                    }
                    if (this.focused !== comp) {
                        const { handler, component } = this.elementWithWheel;
                        const fakeNativeEvent = { target: { component } } as any;
                        const genericEvent = createGenericEventFromPixiEvent(fakeNativeEvent, RzEventTypes.onFocus, component);
                        withErrorPropagation(component, () => handler(genericEvent));
                        propagateEvent(genericEvent, RzEventTypes.onFocus);
                    }
                };

                if (eventName in PixiSupportedEvents && graphic) {
                    graphic.interactive = true;
                    branch.set(comp, genericHandler);
                    this.createEventTracking(eventName, branch);
                }

                if (genericEventType === RzEventTypes.onWheel) {
                    graphic.interactive = true;
                    branch.set(comp, wheelHandler);
                }

                if (genericEventType === RzEventTypes.onKeypress) {
                    graphic.interactive = true;
                    branch.set(comp, keypressHandler);
                }

                if (genericEventType === RzEventTypes.onFocus || genericEventType === RzEventTypes.onBlur) {
                    graphic.interactive = true;
                    branch.set(comp, focusHandler);
                }
            }
        });
    }

    getEventBranchForType = (type: RzEventTypes) => {
        const branch = this.registeredEvents.get(type) || new Map<Component, GenericEventHandler>();
        this.registeredEvents.set(type, branch);
        return branch;
    }

    createEventTracking = (pixiEventType: PixiSupportedEvents, branch: ComponentEvents) => {
        if (branch.size < 2) {
            this.interactionManager.on(pixiEventType, (event: interaction.InteractionEvent) => {
                const genericEventType = toGenericEvent(pixiEventType);
                const currentBranch = this.registeredEvents.get(genericEventType);
                currentBranch.forEach((handler, component) => {
                    const genericEvent = createGenericEventFromPixiEvent(
                        event, genericEventType, component
                    );
                    withErrorPropagation(component, () => handler(genericEvent));
                    propagateEvent(genericEvent, genericEventType);
                });
            });
        }
    }

    onGraphicClick = (event: interaction.InteractionEvent) => {
        event.stopPropagation();
        if (event.currentTarget) {
            const targetComponent = event.currentTarget['component'] as BasicComponent;
            const withWheel = this.elementWithWheel ? this.elementWithWheel.component : null;
            const withKeyboard = this.elementWithKeyboard ? this.elementWithKeyboard.component : null;

            if (targetComponent !== withWheel) {
                this.elementWithWheel = null;
            }
            if (targetComponent !== withKeyboard) {
                this.elementWithKeyboard = null;
            }

            if (this.focused && this.focused !== targetComponent && this.focused.props.onBlur && !isDescendantOf(targetComponent, this.focused)) {
                const genericEvent = createGenericEventFromPixiEvent(
                    event, RzEventTypes.onBlur, this.focused
                );
                withErrorPropagation(this.focused, () => this.focused.props.onBlur(genericEvent));
                propagateEvent(genericEvent, RzEventTypes.onBlur);
            }
        }
    }

    onMouseWheel = (event: MouseWheelEvent) => {
        event.stopPropagation();
        const deltaY = Math.sign(event.deltaY);
        if (this.elementWithWheel) {
            const { handler, component } = this.elementWithWheel;
            const fakeNativeEvent = { target: { component } } as any;
            const genericEvent = createGenericEventFromPixiEvent(fakeNativeEvent, RzEventTypes.onWheel, component, { deltaY });
            withErrorPropagation(component, () => handler(genericEvent));
            propagateEvent(genericEvent, RzEventTypes.onWheel);
        }
    }

    onKeypress = (event: KeyboardEvent) => {
        if (this.elementWithKeyboard) {
            const { key, keyCode, ctrlKey, altKey, shiftKey } = event;
            const { handler, component } = this.elementWithWheel;
            const fakeNativeEvent = { target: { component } } as any;
            const genericEvent = createGenericEventFromPixiEvent(fakeNativeEvent, RzEventTypes.onKeypress, component,
                { key, keyCode, ctrlKey, altKey, shiftKey }
            );
            withErrorPropagation(component, () => handler(genericEvent));
            propagateEvent(genericEvent, RzEventTypes.onKeypress);
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