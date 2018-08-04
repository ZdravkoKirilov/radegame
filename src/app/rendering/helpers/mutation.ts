import { RzElement, RzElementKey, RzElementProps } from "../models";
import { CompositeComponent, ComponentList, Component } from "../models";
import { createComponent, mountComponent } from "./rendering";
import { toIndexedList } from "@app/shared";
import { FunctionalComponent, StatefulComponent } from "../mixins";
import { PrimitiveContainer, PrimitiveCollection } from "../primitives";

export const updateComposite = (element: RzElement, component: CompositeComponent) => {
    const current = component.children[0];
    const incoming = element;

    if (current && incoming) {
        const sameType = current.props.type === incoming.type;
        if (sameType) {
            current.setProps(element.props);
        } else {
            component.children = [createComponent(element, component.meta.engine.factory, component.meta)];
            mountComponent(component.children[0], component.container);
            current.remove();
        }
    }

    if (current && !incoming) {
        component.children = [null];
    }

    if (!current && incoming) {
        component.children = [createComponent(element, component.meta.engine.factory, component.meta)];
        mountComponent(component.children[0], component.container);
    }
};

export const updateContainer = (newProps: RzElementProps, component: PrimitiveContainer) => {
    const current = component.children;
    const newChildren = [];
    newProps.children.forEach((child, index) => {
        const existing = current[index];

        if (existing !== null) {
            const sameType = existing.props.type === child.type;
            if (sameType) {
                existing.setProps(child.props);
                newChildren[index] = existing;
            } else {
                newChildren[index] = createComponent(child, component.meta.engine.factory, component.meta);
                mountComponent(newChildren[index], component.graphic);
                existing.remove();
            }

        } else {
            newChildren[index] = createComponent(child, component.meta.engine.factory, component.meta);
            mountComponent(newChildren[index], component.graphic);
        }
    });

    component.children = newChildren;
};

export const updateCollection = (newProps: RzElementProps, component: PrimitiveCollection) => {
    const current = toIndexedList(component.children) as ComponentList;
    const currentKeys: Set<RzElementKey> = new Set(Object.keys(current));
    const newChildren: ComponentList = newProps.children.reduce((acc, child) => {
        const key = child.props.key;
        if (!key) {
            throw new Error('Each element in a collection must have a "key" prop. Shame.');
        }
        const existing = current[key];

        if (existing) {
            acc[key].setProps(child.props);
        } else {
            acc[key] = createComponent(child, component.meta.engine.factory, component.meta);
            mountComponent(acc[key], component.graphic);
        }

        currentKeys.delete(key);
        return acc;
    }, {} as ComponentList);

    currentKeys.forEach(key => {
        current[key].remove();
    });

    component.children = Object.values(newChildren);//sort here if needed
};

export const isStateful = (component: Component): boolean => {
    return 'composite' in component;
};

export const isComposite = (component: Component): component is CompositeComponent => {
    return component instanceof StatefulComponent || component instanceof FunctionalComponent;
};