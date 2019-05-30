import { RzElement, RzElementKey, RzElementProps } from "../models";
import { CompositeComponent, Component } from "../models";
import { createComponent } from "./creation";
import { toDictionary } from "@app/shared";
import {
    PrimitiveContainer, PrimitiveCollection,
} from "../primitives";
import { mountComponent } from "./mounting";
import { AbstractContainer } from "../interfaces";
import { isComposite, isFunctional, isPrimitive } from "./misc";
import { BasicComponent, MemoRenderFunction, StatefulComponent } from "../bases";

export const updateComposite = (element: RzElement, component: CompositeComponent) => {
    const currentChild: Component<RzElementProps> = (component.children || [])[0];
    const incomingChild: RzElement = Array.isArray(element) ? element[0] : element;

    if (currentChild && incomingChild) {

        const sameType = currentChild.type === incomingChild.type;
        if (sameType) {
            updateChild(currentChild, incomingChild);
        } else {
            component.children = [createComponent(incomingChild, component.meta.engine.factory, component.meta)];
            mountComponent(component.children[0], component.container);
        }
    }

    if (currentChild && !incomingChild) {
        component.children = [null];
        component.meta.engine.mutator.removeComponent(currentChild);
    }

    if (!currentChild && incomingChild) {
        component.children = [createComponent(element, component.meta.engine.factory, component.meta)];
        mountComponent(component.children[0], component.container);
    }
};

export const updateChild = (currentChild: Component<RzElementProps>, updated: RzElement) => {
    currentChild.props.children = updated.children;
    currentChild.props = updated.props;

    if (isFunctional(currentChild)) {
        const isMemo = (currentChild as MemoRenderFunction).memo;
        if (isMemo) {
            const shouldUpdate = (currentChild as MemoRenderFunction).shouldUpdate;
            if (shouldUpdate && shouldUpdate(currentChild.props, updated)) {
                updateComposite(currentChild(updated.props), currentChild as CompositeComponent);
            } else if (currentChild.props !== updated) {
                updateComposite(currentChild(updated.props), currentChild as CompositeComponent);
            }
        } else {
            updateComposite(currentChild(updated.props), currentChild as CompositeComponent);
        }
    }

    if (isComposite(currentChild)) {
        if ((currentChild as StatefulComponent).shouldRerender(updated, (currentChild as StatefulComponent).state)) {
            updateComposite((currentChild as StatefulComponent).render(), currentChild);
        }
    }

    if (isPrimitive(currentChild)) {
        if ((currentChild as BasicComponent).shouldRerender(updated)) {
            currentChild.meta.engine.mutator.updateComponent(currentChild);
        }
    }
};

export const updateContainer = (newProps: RzElementProps, component: PrimitiveContainer, container: AbstractContainer) => {
    const current = component.children;
    const newPropsChildren = newProps.children as RzElement[];
    const newChildren = [];

    newPropsChildren.forEach((child, index) => {
        const existing = current[index];
        updateChild(existing, child);
    });

    component.children = newChildren;
};

export const updateCollection = (newProps: RzElementProps, component: PrimitiveCollection) => {

    const current = toDictionary(component.children, 'props.key');
    const keysForDeletion: Set<RzElementKey> = new Set(component.children.map(elem => (elem.props as any).key));
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
        }

        keysForDeletion.delete(key);
        return acc;
    }, {});

    keysForDeletion.forEach(key => {
        const toBeRemoved = current[key];
        component.meta.engine.mutator.removeComponent(toBeRemoved);
    });

    component.children = Object.values(newChildren);//sort here if needed
};



