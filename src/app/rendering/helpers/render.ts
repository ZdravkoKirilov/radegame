import { DisplayObject, Container } from "pixi.js";

import { BaseObject, StatelessObject, StatelessElement } from "../interfaces";
import { BaseElement } from "../models";
import { factory, Factory } from "./factory";
import { PRIMITIVE_TYPES } from "../config";
import { parse } from "./parser";

export const createRenderer = (factory: Factory) => (props: BaseElement, container: Container, parent: BaseObject = null) => mount(props, container, parent, factory);

const mount = (props: BaseElement, container: Container, parent: BaseObject = null, compositeFactory: Factory = null): BaseObject => {
    if (isPrimitive(props.type)) {
        return mountPrimitive(props, container, parent);
    }
    if (isComposite(props) && compositeFactory) {
        return mountComposite(props, container, parent, compositeFactory);
    }
    return null;
};

const mountPrimitive = (props: BaseElement, container: Container, parent: BaseObject = null): BaseObject => {
    const element = factory(props, parent) as BaseObject;
    element.__children__ = mountChildren(element);
    container.addChild(element.__face__);
    return element;
};

const mountComposite = (props: BaseElement, container: Container, parent: BaseObject = null, compositeFactory: Factory): BaseObject => {
    if (isStateless(props, compositeFactory)) {
        return mountStateless(props, container, parent, compositeFactory);
    } else {
        const element = compositeFactory(props, parent) as BaseObject;
        const template = element.render();
        const context = { ...props, ...element.getContext() };
        const parsed = parse(template, context);
        return mount(parsed, container, parent);
    }
};

const mountStateless = (props: BaseElement, container: Container, parent: BaseObject = null, compositeFactory: Factory): BaseObject => {
    const result = compositeFactory(props) as StatelessElement;
    const parsed = parse(result.template, result.context || props);
    return mount(parsed, container, parent);
};

const mountChildren = (element: BaseObject): { [key: string]: BaseObject } => {
    return element.props.children.reduce((total, child) => {
        total[child.name] = mount(child, element.__face__, element);
        return total;
    }, {});
};

export const update = () => {

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

const isComposite = (props: BaseElement): boolean => {
    return !isPrimitive(props.type);
};

const isStateless = (props: BaseElement, compositeFactory: Factory): boolean => {
    const elem = compositeFactory(props);
    return 'template' in elem && 'context' in elem;
};