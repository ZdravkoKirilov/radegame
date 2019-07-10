import { RzElement, RzElementKey, RzElementProps, RzElementChild } from "../models";
import { CompositeComponent, Component } from "../models";
import { createComponent } from "./creation";
import { toDictionary } from "@app/shared";
import {
    PrimitiveContainer, PrimitiveCollection,
} from "../primitives";
import { mountComponent, unmountComponent } from "./mounting";
import { isFunctional, isPrimitive, isStateful, isMemo, flatRender } from "./misc";
import { AbstractContainer } from "../interfaces";
import { MemoRenderFunction } from "../bases";
import { prepareExtras } from "./hooks";

export const updateComposite = (element: RzElement, component: CompositeComponent) => {
    const currentChild: Component = (component.children || [])[0];
    const incomingChild = Array.isArray(element) ? element[0] : element;
    component.children = reconcileChildSlot(currentChild, incomingChild, component, component.container);
};

export const updateComponent = (component: Component, rendered: RzElementChild) => {
    if (isPrimitive(component)) {
        component.update();
    } else {
        updateComposite(flatRender(rendered), component);
    }
};

export const updateMemo = (memoComp: MemoRenderFunction, updated: RzElement) => {
    const shouldUpdate = memoComp.shouldUpdate;
    const shouldUpdateIsFunction = typeof shouldUpdate === typeof Function;
    const shouldUpdateIsArray = Array.isArray(shouldUpdate);
    const extras = prepareExtras(memoComp, memoComp.meta);

    if (shouldUpdateIsFunction && (shouldUpdate as Function)(memoComp.props, updated.props)) {
        memoComp.props = updated.props;
        return updateComponent(memoComp, memoComp(updated.props, extras));
    }

    if (shouldUpdateIsArray && shouldUpdate.length > 0) {
        if ((shouldUpdate as []).some(propName => memoComp.props[propName] !== updated.props[propName])) {
            memoComp.props = updated.props;
            return updateComponent(memoComp, memoComp(updated.props, extras));
        }
        memoComp.props = updated.props;
        return;
    }

    if (memoComp.props !== updated) {
        memoComp.props = updated.props;
        return updateComponent(memoComp, memoComp(updated.props, extras));
    }

    memoComp.props = updated.props;
}

export const reconcileChildSlot = (currentChild: Component, incomingChild: RzElement, component: Component, container: AbstractContainer) => {
    let newChildren = [null];

    if (currentChild && incomingChild) {

        const sameType = currentChild.type === incomingChild.type;
        if (sameType) {
            updateByType(currentChild, incomingChild);
            newChildren = [currentChild];
        } else {
            const newInstance = createComponent(incomingChild, component.meta.engine.factory, component.meta);
            newChildren = [newInstance];
            mountComponent(newInstance, container);
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
    }
    return newChildren;
}

export const updateByType = (target: Component<RzElementProps>, updated: RzElement) => {

    if (isFunctional(target)) {
        if (isMemo(target)) {
            return updateMemo(target, updated);
        } else {
            target.props = updated.props;
            const extras = prepareExtras(target, target.meta);
            updateComponent(target, target(updated.props, extras));
        }
    }

    if (isStateful(target)) {
        target.updateProps(updated.props);
    }

    if (isPrimitive(target)) {
        target.updateProps(updated.props);
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
            updateByType(existing, child);
        } else {
            acc[key] = createComponent(child, component.meta.engine.factory, component.meta);
            mountComponent(acc[key], component.graphic);
            updateByType(acc[key], child);
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



