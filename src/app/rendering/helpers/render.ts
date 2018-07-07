import { Container } from "pixi.js-legacy";

import { BaseProps, MetaProps } from "../models";
import { Factory } from "./factory";
import { PRIMITIVE_TYPES } from "../config";
import { parse } from "./parser";
import { BasicComponent } from '../mixins';
import { Component, Mounter, isStateful, CompositeComponent } from "../interfaces";

export const createRenderer = (factory: Factory) => (
    markup: string,
    container: Container,
    context?: any,
    meta?: MetaProps) => {
    const props = parse({ source: markup, context });
    return mount(props, container, null, factory, meta);
};

export const mount: Mounter = (
    props: BaseProps,
    container: Container,
    parent: Component = null,
    factory: Factory = null,
    meta?: MetaProps): Component => {

    if (isPrimitive(props.type)) {
        return mountPrimitive(props, container, parent, factory, meta);
    } else {
        return mountComposite(props, container, parent, factory, meta);
    }
};

const mountPrimitive = (
    props: BaseProps,
    container: Container,
    parent: Component = null,
    factory: Factory,
    meta?: MetaProps): Component => {
    const element: BasicComponent = factory(props, parent, meta) as BasicComponent;
    if (container instanceof Container) {
        container.addChild(element.graphic);
    }
    element.children = mountChildren(props, element.graphic as Container, element, factory, meta);
    element.update();
    return element;
};

const mountComposite = (
    props: BaseProps,
    container: Container,
    parent: Component = null,
    factory: Factory,
    meta?: MetaProps): Component => {
    const element = factory(props, parent, meta) as CompositeComponent;
    const template = element.render();
    // here detect <children> notation?
    const parsed = parse({ source: template, context: element });

    if (isStateful(element) && 'willMount' in element) {
        (element as any).willMount();
    }

    element.children = [mount(parsed, container, element, factory, meta)];
    
    if (isStateful(element) && 'didMount' in element) {
        (element as any).didMount();
    }

    element.update();
    return element;
};

const mountChildren = (
    props: BaseProps,
    container: Container,
    parent: Component = null,
    factory: Factory,
    meta?: MetaProps): Component[] => {
    return props.children.map(childProps => mount(childProps, container, parent, factory, meta));
};

const isPrimitive = (type: string) => {
    return new Set(Object.values(PRIMITIVE_TYPES)).has(type);
};