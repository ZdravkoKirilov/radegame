import { Container, DisplayObject } from "pixi.js";

import { BaseObject } from "../interfaces";
import { BaseProps } from "../models";
import { factory, Factory } from "./factory";
import { PRIMITIVE_TYPES } from "../config";
import { parse } from "./parser";
import { StatelessComponent } from '../primitives';

export const createRenderer =
    (compositeFactory: Factory) =>
        (props: BaseProps, container: Container, parent: BaseObject = null) =>
            mount(props, container, parent, compositeFactory);

const mount = (
    props: BaseProps,
    container: Container,
    parent: BaseObject = null,
    compositeFactory: Factory = null): BaseObject => {
    if (isPrimitive(props.type)) {
        return mountPrimitive(props, container, parent);
    }
    if (isComposite(props) && compositeFactory) {
        return mountComposite(props, container, parent, compositeFactory);
    }
    return null;
};

const mountPrimitive = (props: BaseProps, container: Container, parent: BaseObject = null): BaseObject => {
    const element = factory(props, parent);
    element.__children__ = mountChildren(element);
    element.__container = container;
    container.addChild(element.__face__);
    return element;
};

const mountComposite = (
    props: BaseProps,
    container: Container,
    parent: BaseObject = null,
    compositeFactory: Factory): BaseObject => {
    if (isStateless(props, compositeFactory)) {
        const stateless = mountStateless(props, container, parent, compositeFactory);
        return stateless;
    } else {
        const element = compositeFactory(props, parent);
        const template = element.render();
        const parsed = parse({ source: template, context: element });
        element.willMount();
        mount(parsed, container, parent);
        element.__children__ = mountChildren(element);
        element.__container = container;
        element.didMount();
        return element;
    }
};

const mountStateless = (props: BaseProps, container: Container, parent: BaseObject = null, compositeFactory: Factory): BaseObject => {
    const element = compositeFactory(props) as StatelessComponent;
    mount(element.props, container, parent);
    element.__container__ = container;
    element.__children__ = mountChildren(element);
    return element;
};

const mountChildren = (element: BaseObject): { [key: string]: BaseObject } => {
    return element.props.children.reduce((total, child) => {
        total[child.name] = mount(child, element.__face__, element);
        return total;
    }, {});
};

export const update = (elem: BaseObject, newData: BaseProps) => {
    if (isPrimitive(elem.props.type)) {
        const graphic = elem.__face__ as DisplayObject;
        Object.keys(newData.mapped).forEach(key => {
            graphic[key] = newData[key];
        });
    }
    updateChildren(elem, newData);
};

const updateChildren = (elem: BaseObject, newData: BaseProps) => {
    const currentChildren = new Set(Object.values(elem.children));
    const currentChildrenNames = new Set(Object.keys(elem.children));

    const newChildren = new Set(newData.children);
    const newChildrenNames = new Set(newData.children.map(child => child.name));

    currentChildren.forEach(child => {
        if (!newChildrenNames.has(child.props.name)) {
            child.remove();
        }
    });
    newChildren.forEach((child: BaseProps) => {
        if (currentChildrenNames.has(child.name)) {
            currentChildren.forEach(elem => {
                if (elem.props.name === child.name) {
                    elem.setProps(child);
                }
            });
        } else {
            mount(child, elem.__face__, elem, null);
        }
    });
};

const isPrimitive = (type: string) => {
    return type in PRIMITIVE_TYPES;
};

const isComposite = (props: BaseProps): boolean => {
    return !isPrimitive(props.type);
};

const isStateless = (props: BaseProps, compositeFactory: Factory): boolean => {
    const elem = compositeFactory(props);
    return elem.stateless;
};