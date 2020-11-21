import { get } from 'lodash';

import { toDictionary } from "@app/shared";

import {
    RzElement, RzElementKey, RzElementProps, RzNode, RenderFunction, CompositeComponent, Component,
    createComponent, PrimitiveContainer, PrimitiveCollection, mountComponent, unmountComponent, unmountChildren,
    isFunctional, isPrimitive, isStateful, isMemo, flatRender, AbstractContainer,
    MemoRenderFunction, prepareExtras, callWithErrorPropagation
} from "../internal";

export const updateComposite = (element: RzElement, component: CompositeComponent) => {
    const currentChild: Component = (component.children || [])[0];
    const incomingChild = Array.isArray(element) ? element[0] : element;

    if (element === null) {
        unmountChildren(component);
    } else {
        component.children = reconcileChildSlot(currentChild, incomingChild, component, component.container as any);
    }
};

export const updateComponent = (component: Component, rendered: RzNode) => {
    if (isPrimitive(component)) {
        component.update();
    } else {
        updateComposite(flatRender(rendered), component);
    }
};

export const updateWithNewProps = <T = any>(component: Component, newProps: {} & RzElementProps & T) => {
    if (isFunctional(component)) {
        const mergedProps = {
            ...(component.props || {}),
            ...(newProps || {}),
        };
        const extras = prepareExtras(component, component.meta as any);
        component.props = mergedProps;
        const newRenderedOutput = callWithErrorPropagation(component.parent, () => component(mergedProps, extras));
        updateComponent(component, newRenderedOutput);
    }
    if (isStateful(component)) {
        callWithErrorPropagation(component.parent, () => component.updateProps(newProps));
    }
};

export const updateMemo = (memoComp: MemoRenderFunction, updated: RzElement) => {
    updated = updated || {} as RzElement;
    const shouldUpdate = memoComp.shouldUpdate;
    const shouldUpdateIsFunction = typeof shouldUpdate === typeof Function;
    const shouldUpdateIsArray = Array.isArray(shouldUpdate);
    const extras = prepareExtras(memoComp, memoComp.meta as any);

    if (shouldUpdateIsFunction && (shouldUpdate as Function)(memoComp.props, updated.props)) {
        memoComp.props = updated.props;
        return updateComponent(memoComp, callWithErrorPropagation(memoComp.parent, () => memoComp(updated.props, extras)));
    }

    if (shouldUpdateIsArray && shouldUpdate.length > 0) {
        if ((shouldUpdate as []).some(propName => get(memoComp.props, propName) !== get(updated.props, propName))) {
            memoComp.props = updated.props;
            return updateComponent(memoComp, callWithErrorPropagation(memoComp.parent, () => memoComp(updated.props, extras)));
        }
        memoComp.props = updated.props;
        return;
    }

    if (memoComp.props !== updated && !shouldUpdate) {
        memoComp.props = updated.props;
        return updateComponent(memoComp, callWithErrorPropagation(memoComp.parent, () => memoComp(updated.props, extras)));
    }

    memoComp.props = updated.props;
}

const updateRegularFunctionalComponent = (target: RenderFunction, updated: RzElement) => {
    target.props = updated.props;
    const extras = prepareExtras(target, target.meta as any);
    const rendered = callWithErrorPropagation(target.parent, () => target(updated.props, extras))
    updateComponent(target, rendered);
};

export const updateFunctionalComponent = (target: RenderFunction, updated: RzElement) => {
    if (isMemo(target) && updated) {
        return updateMemo(target, updated);
    } else if (updated) {
        updateRegularFunctionalComponent(target, updated);
    }
};

export const updateContainer = (newProps: RzElementProps, component: PrimitiveContainer) => {
    const current = component.children as any;
    const newPropsChildren = newProps.children as RzElement[] | RzElement;
    let newChildren = [];
    if (Array.isArray(newPropsChildren)) {
        newChildren = newPropsChildren.reduce((acc, item, index) => {
            const existing = current[index];
            acc = [...acc, ...reconcileChildSlot(existing, item, component, component.graphic || component.container)];
            return acc;
        }, [] as any);
    } else {
        const existing = current[0];
        newChildren = reconcileChildSlot(existing, newPropsChildren, component, component.graphic || component.container);
    }

    component.children = newChildren;
};

export const updateCollection = (newProps: RzElementProps, component: PrimitiveCollection | any) => {
    const current = toDictionary(component.children as any, 'props.key');
    const keysForDeletion: Set<RzElementKey> = new Set(component.children.map((elem: any) => elem.props.key));
    const newPropsChildren = newProps.children as RzElement[];
    const newChildren = newPropsChildren.reduce((acc, child: RzElement) => {
        if (child === null) {
            return acc;
        }
        const key = child.props.key;
        if (key === undefined) {
            throw new Error('Each element in a collection must have a "key" prop. Shame.');
        }
        const existing = current[key] as any;
        if (existing) {
            acc[key] = existing;
            updateByType(existing, child);
        } else {
            acc[key] = createComponent(child, component.meta.engine.factory, component.meta, component);
            mountComponent(acc[key], component.graphic);
            updateByType(acc[key], child);
        }

        keysForDeletion.delete(key);
        return acc;
    }, {} as any);

    keysForDeletion.forEach(key => {
        const toBeRemoved = current[key] as any;
        unmountComponent(toBeRemoved);
    });

    component.children = Object.values(newChildren);//sort here if needed
};

export const reconcileChildSlot = (currentChild: Component | any, incomingChild: RzElement, component: Component, container: AbstractContainer) => {
    let newChildren = [null];

    if (currentChild && incomingChild) {

        const sameType = currentChild.type === incomingChild.type;
        if (sameType) {
            updateByType(currentChild, incomingChild);
            newChildren = [currentChild];
        } else {
            const newInstance = createComponent(incomingChild, component.meta!.engine.factory, component.meta!, component) as any;
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
        const newInstance = createComponent(incomingChild, component.meta!.engine.factory, component.meta!, component) as any;
        newChildren = [newInstance];
        mountComponent(newInstance, container);
    }
    return newChildren;
}

export const updateByType = (target: Component<RzElementProps>, updated: RzElement) => {
    if (isFunctional(target)) {
        updateFunctionalComponent(target, updated);
    }

    if (isStateful(target)) {
        callWithErrorPropagation(target.parent, () => target.updateProps(updated.props));
    }

    if (isPrimitive(target)) {
        target.updateProps(updated.props);
    }
};



