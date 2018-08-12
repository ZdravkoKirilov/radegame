import { AbstractContainer, AbstractFactory, AbstractRenderEngine } from "../interfaces";
import { Component, MetaProps, RzElement } from "../models";
import { mountComponent } from "./mounting";
import { createComponent } from "./creation";

export const createRenderer2 = (abstractFactory: AbstractFactory) => {
    const renderer = (element: RzElement, meta: MetaProps, container: AbstractContainer): Component => {
        const component = createComponent(element, abstractFactory, meta);
        mountComponent(component, container);
        return component;
    };
    return renderer;
};

export const createRenderer = (engine: AbstractRenderEngine, resources: Set<string>) => {
    const renderFunc = (elem: RzElement, container: AbstractContainer): Promise<Component> => {
        return new Promise((resolve) => {
            engine.loader.loadAll(resources).then(resources => {
                const meta = {} as MetaProps;
                meta.textures = resources;
                meta.engine = engine;
                const component = createComponent(elem, engine.factory, meta);
                mountComponent(component, container);
                resolve(component);
            });
        });
    }
    return renderFunc;
};