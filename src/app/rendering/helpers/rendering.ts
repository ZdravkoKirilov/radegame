import { AbstractContainer, AbstractFactory, AbstractRenderEngine } from "../interfaces";
import { Component, MetaProps, RzElement } from "../models";
import { mountComponent } from "./mounting";
import { createComponent } from "./creation";
import { ContextManager, AssetManager } from "../services";

export const createRenderer2 = (abstractFactory: AbstractFactory) => {
    const renderer = (element: RzElement, meta: MetaProps, container: AbstractContainer): Component => {
        const component = createComponent(element, abstractFactory, meta);
        mountComponent(component, container);
        return component;
    };
    return renderer;
};

export const createRenderer = (engine: AbstractRenderEngine, resources: Set<string>, metaProps?: MetaProps) => {
    const renderFunc = (elem: RzElement, container: AbstractContainer): Promise<Component> => {
        return new Promise(async (resolve) => {
            const assetManager = new AssetManager(engine.loader);
            await assetManager.addMany(resources);
            const meta = metaProps || {} as MetaProps;
            meta.engine = engine;
            meta.context = new ContextManager();
            meta.assets = assetManager;
            const component = createComponent(elem, engine.factory, meta);
            mountComponent(component, container);
            resolve(component);

        });
    }
    return renderFunc;
};