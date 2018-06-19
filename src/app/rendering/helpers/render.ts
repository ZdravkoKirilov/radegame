import { Container, DisplayObject } from "pixi.js";

import { BaseProps, MetaProps } from "../models";
import { Factory } from "./factory";
import { PRIMITIVE_TYPES } from "../config";
import { parse } from "./parser";
import { StatelessComponent, BasicComponent, StatefulComponent } from '../mixins';
import { Component, Mounter } from "../interfaces";

export const createRenderer = (factory: Factory) => (markup: string, container: Container, context?: any, meta?: MetaProps) => {
    const props = parse({ source: markup, context });
    return mount(props, container, null, factory, meta);
};

const mount: Mounter = (props: BaseProps, container: Container, parent: Component = null, factory: Factory = null, meta?: MetaProps): Component => {

    if (isPrimitive(props.type)) {
        return mountPrimitive(props, container, parent, factory, meta);
    } else {
        return mountComposite(props, container, parent, factory, meta);
    }
};

const mountPrimitive = (props: BaseProps, container: Container, parent: Component = null, factory: Factory, meta?: MetaProps ): Component => {
    const element: BasicComponent = factory(props, parent, meta) as BasicComponent;
    if (container instanceof Container) {
        element.render(container);
    }
    element.children = mountChildren(props, element.graphic as Container, element, factory, meta);
    return element;
};

const mountComposite = (props: BaseProps, container: Container, parent: Component = null, factory: Factory, meta?: MetaProps): Component => {
    const element = factory(props, parent) as StatelessComponent<typeof props> & StatefulComponent<typeof props, any>;
    const template = element.render();
    // here detect <children> notation?
    const parsed = parse({ source: template, context: element });
    const stateless = element.stateless;

    if (!stateless) {
        element.willMount();
    }

    element.firstChild = mount(parsed, container, element, factory, meta);

    if (!stateless) {
        element.didMount();
    }

    return element;
};

const mountChildren = (props: BaseProps, container: Container, parent: Component = null, factory: Factory, meta?: MetaProps): Component[] => {
    return props.children.map(childProps => mount(childProps, container, parent, factory, meta));
};

const isPrimitive = (type: string) => {
    return new Set(Object.values(PRIMITIVE_TYPES)).has(type);
};