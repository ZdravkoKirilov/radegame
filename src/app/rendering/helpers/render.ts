import { Container, DisplayObject } from "pixi.js";

import { BaseProps } from "../models";
import { Factory } from "./factory";
import { PRIMITIVE_TYPES } from "../config";
import { parse } from "./parser";
import { StatelessComponent, BasicComponent, CompositeComponent } from '../mixins';
import { Component } from "../interfaces";

export const createRenderer = (factory: Factory) => (markup: string, container: Container, context?: any) => {
    const props = parse({ source: markup, context });
    return mount(props, container, null, factory);
};


const mount = (props: BaseProps, container: Container, parent: Component = null, factory: Factory = null): Component => {

    if (isPrimitive(props.type)) {
        return mountPrimitive(props, container, parent, factory);
    } else {
        return mountComposite(props, container, parent, factory);
    }
};

const mountPrimitive = (props: BaseProps, container: Container, parent: Component = null, factory: Factory): Component => {
    const element: BasicComponent = factory(props, parent) as BasicComponent;
    if (container instanceof Container) {
        element.render(container);
    }
    element.children = mountChildren(props, element.graphic as Container, element, factory);
    return element;
};

const mountComposite = (props: BaseProps, container: Container, parent: Component = null, factory: Factory): Component => {
    const element = factory(props, parent) as StatelessComponent<typeof props> & CompositeComponent<typeof props, any>;
    const template = element.render();
    // here detect <children> notation?
    const parsed = parse({ source: template, context: element });
    const stateless = element.stateless;

    if (!stateless) {
        element.willMount();
    }

    element.firstChild = mount(parsed, container, element, factory);

    if (!stateless) {
        element.didMount();
    }

    return element;
};

const mountChildren = (props: BaseProps, container: Container, parent: Component = null, factory: Factory): Component[] => {
    return props.children.map(childProps => mount(childProps, container, parent, factory));
};

const isPrimitive = (type: string) => {
    return new Set(Object.values(PRIMITIVE_TYPES)).has(type);
};