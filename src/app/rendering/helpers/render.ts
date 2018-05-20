import { Container } from "pixi.js";

import { BaseObject, StatelessObject, StatelessElement } from "../interfaces";
import { BaseProps } from "../models";
import { factory, Factory } from "./factory";
import { PRIMITIVE_TYPES } from "../config";
import { parse } from "./parser";
import { StatelessComponent } from '../primitives';

export const createRenderer = (compositeFactory: Factory) => (props: BaseProps, container: Container, parent: BaseObject = null) => mount(props, container, parent, compositeFactory);

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
        const parsed = parse(template, element);
        element.willMount();
        mount(parsed, container, parent);
        element.__children__ = mountChildren(element);
        element.didMount();
        return element;
    }
};

const mountStateless = (props: BaseProps, container: Container, parent: BaseObject = null, compositeFactory: Factory): BaseObject => {
    const element = compositeFactory(props) as StatelessComponent;
    mount(element.props, container, parent);
    element.__children__ = mountChildren(element);
    return element;
};

const mountChildren = (element: BaseObject): { [key: string]: BaseObject } => {
    return element.props.children.reduce((total, child) => {
        total[child.name] = mount(child, element.__face__, element);
        return total;
    }, {});
};

export const update = (elem: BaseObject) => {

};

const updatePrimitive = () => {

};

const updateComposite = () => {

};

const updateStateless = () => {

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