import { RzElement, RzElementKey, RzElementProps } from "../models";
import { CompositeComponent, ComponentList, Component } from "../models";
import { createComponent } from "./creation";
import { toDictionary } from "@app/shared";
import { FunctionalComponent, StatefulComponent } from "../mixins";
import {
    PrimitiveContainer, PrimitiveCollection,
} from "../primitives";
import { mountComponent } from "./mounting";
import { AbstractContainer } from "../interfaces";

export const updateComposite = (element: RzElement | RzElement[], component: CompositeComponent) => {
    const current = (component.children || [])[0];
    const incoming = Array.isArray(element) ? element[0] : element;

    if (current && incoming) {

        const sameType = current.type === incoming.type;
        if (sameType) {
            incoming.props.children = incoming.children;
            current.setProps(incoming.props);
        } else {
            component.children = [createComponent(incoming, component.meta.engine.factory, component.meta, component)];
            mountComponent(component.children[0], component.container);
            current.remove();
        }
    }

    if (current && !incoming) {
        component.children = [null];
    }

    if (!current && incoming) {
        component.children = [createComponent(element, component.meta.engine.factory, component.meta, component)];
        setTimeout(() => {
            mountComponent(component.children[0], component.container);
        }, 0);
    }
};

export const updateContainer = (newProps: RzElementProps, component: PrimitiveContainer, container: AbstractContainer) => {
    const current = component.children;
    const newPropsChildren = newProps.children as RzElement[];
    const newChildren = [];

    newPropsChildren.forEach((child, index) => {
        const existing = current[index];

        if (existing !== null) {
            const sameType = existing.type === (child || { type: '' }).type;
            if (sameType) {
                child.props.children = child.children;
                (existing).setProps(child.props);
                newChildren[index] = existing;
            } else {
                newChildren[index] = createComponent(child, component.meta.engine.factory, component.meta, component);
                mountComponent(newChildren[index], container);
                existing.remove();
            }

        } else {
            newChildren[index] = createComponent(child, component.meta.engine.factory, component.meta, component);
            mountComponent(newChildren[index], container);
        }
    });

    component.children = newChildren;
};

export const updateCollection = (newProps: RzElementProps, component: PrimitiveCollection) => {

    const current = toDictionary(component.children, 'props.key') as ComponentList;
    const currentKeys: Set<RzElementKey> = new Set(component.children.map(elem => elem.props.key));
    const newPropsChildren = newProps.children as RzElement[];

    const newChildren: ComponentList = newPropsChildren.reduce((acc, child) => {
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
            child.props.children = child.children;
            acc[key].setProps(child.props);
        } else {
            acc[key] = createComponent(child, component.meta.engine.factory, component.meta, component);
            mountComponent(acc[key], component.graphic);
        }

        currentKeys.delete(key);
        return acc;
    }, {} as ComponentList);

    currentKeys.forEach(key => {
        const toBeRemoved = current[key];
        toBeRemoved.remove();
    });

    component.children = Object.values(newChildren);//sort here if needed
};

export const isComposite = (component: Component): component is CompositeComponent => {
    return component instanceof StatefulComponent || component instanceof FunctionalComponent;
};



