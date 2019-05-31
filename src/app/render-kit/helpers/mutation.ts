import { RzElement, RzElementKey, RzElementProps } from "../models";
import { CompositeComponent, Component } from "../models";
import { createComponent } from "./creation";
import { toDictionary } from "@app/shared";
import {
    PrimitiveContainer, PrimitiveCollection,
} from "../primitives";
import { mountComponent, unmountComponent } from "./mounting";
import { isFunctional, isPrimitive, isStateful, isMemo } from "./misc";
import { AbstractContainer } from "../interfaces";

export const updateComposite = (element: RzElement, component: CompositeComponent) => {
    const currentChild: Component = (component.children || [])[0];
    const incomingChild = Array.isArray(element) ? element[0] : element;
    component.children = reconcileChildSlot(currentChild, incomingChild, component, component.container);
};

export const updateComponent = (component: Component) => {
    if (isPrimitive(component)) {
        component.update();
    }
};

export const reconcileChildSlot = (currentChild: Component, incomingChild: RzElement, component: Component, container: AbstractContainer) => {
    let newChildren = [null];

    if (currentChild && incomingChild) {

        const sameType = currentChild.type === incomingChild.type;
        if (sameType) {
            updateChild(currentChild, incomingChild);
            newChildren = [currentChild];
        } else {
            const newInstance = createComponent(incomingChild, component.meta.engine.factory, component.meta);
            newChildren = [newInstance];
            mountComponent(newInstance, container);
            updateComponent(newInstance);
            unmountComponent(currentChild);
        }
    }

    if (currentChild && !incomingChild) {
        newChildren = [null];
        unmountComponent(currentChild);
    }

    if (!currentChild && incomingChild) {
        const newInstance = createComponent(incomingChild, component.meta.engine.factory, component.meta);
        newChildren = [newInstance];
        mountComponent(newInstance, container);
        updateComponent(newInstance);
    }
    return newChildren;
}

export const updateChild = (currentChild: Component<RzElementProps>, updated: RzElement) => {
    currentChild.props = updated.props;

    if (isFunctional(currentChild)) {
        if (isMemo(currentChild)) {
            const shouldUpdate = currentChild.shouldUpdate;
            if (typeof shouldUpdate === typeof Function && (shouldUpdate as Function)(currentChild.props, updated)) {
                updateComposite(currentChild(updated.props), currentChild);
            } else if (Array.isArray(shouldUpdate) && shouldUpdate.length > 0) {
                if (shouldUpdate.some(propName => currentChild.props[propName] !== updated[propName])) {
                    updateComposite(currentChild(updated.props), currentChild);
                }
            } else if (currentChild.props !== updated) {
                updateComposite(currentChild(updated.props), currentChild);
            }
        } else {
            updateComposite(currentChild(updated.props), currentChild);
        }
    }

    if (isStateful(currentChild)) {
        if (currentChild.shouldRerender(updated, currentChild.state)) {
            updateComposite(currentChild.render(), currentChild);
        }
    }

    if (isPrimitive(currentChild)) {
        if (currentChild.shouldRerender(updated)) {
            currentChild.update();
        }
    }
};

export const updateContainer = (newProps: RzElementProps, component: PrimitiveContainer) => {
    const current = component.children;
    const newPropsChildren = newProps.children as RzElement[] | RzElement;
    let newChildren = [];

    if (Array.isArray(newPropsChildren)) {
        newChildren = newPropsChildren.reduce((acc, item, index) => {
            const existing = current[index];
            acc = [...acc, ...reconcileChildSlot(existing, item, component, component.graphic || component.container)];
            return acc;
        }, []);
    } else {
        const existing = current[0];
        newChildren = reconcileChildSlot(existing, newPropsChildren, component, component.graphic || component.container);
    }

    component.children = newChildren;
};

export const updateCollection = (newProps: RzElementProps, component: PrimitiveCollection) => {

    const current = toDictionary(component.children, 'props.key');
    const keysForDeletion: Set<RzElementKey> = new Set(component.children.map(elem => elem.props.key));
    const newPropsChildren = newProps.children as RzElement[];

    const newChildren = newPropsChildren.reduce((acc, child: RzElement) => {
        if (child === null) {
            return acc;
        }
        const key = child.props.key;
        if (key === undefined) {
            throw new Error('Each element in a collection must have a "key" prop. Shame.');
        }
        const existing = current[key];
        if (existing) {
            acc[key] = existing;
            updateChild(existing, child);
        } else {
            acc[key] = createComponent(child, component.meta.engine.factory, component.meta);
            mountComponent(acc[key], component.graphic);
            updateComponent(acc[key]);
        }

        keysForDeletion.delete(key);
        return acc;
    }, {});

    keysForDeletion.forEach(key => {
        const toBeRemoved = current[key];
        unmountComponent(toBeRemoved);
    });

    component.children = Object.values(newChildren);//sort here if needed
};



