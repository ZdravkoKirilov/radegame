import * as Pixi from 'pixi.js';
import { Container, Application } from 'pixi.js';

import { AbstractRenderEngine, AbstractMountManager, MountConfig, createRenderer, createElement, RzElementType, unmountComponent } from "@app/render-kit";
import { PixiFactory } from "./factory";
import { PixiEnhancer } from "./enhancers";
import { PixiEventsManager } from "./events";
import { PixiMutator } from "./mutator";
import { PixiLoader } from "./loader";

const ticker = Pixi.ticker.shared;
ticker.autoStart = false;
ticker.stop();

export const createPixiEngine = (app: Pixi.Application): AbstractRenderEngine => {
    const factory = new PixiFactory();
    const mutator = new PixiMutator();
    const enhancer = new PixiEnhancer();
    const event = new PixiEventsManager(app.renderer.plugins.interaction);
    const loader = new PixiLoader();

    return {
        factory,
        mutator,
        enhancer,
        event,
        loader,
        app,
        destroy: () => {
            // unsubscribe
        },
    };
}

export const mountPixi: AbstractMountManager = async (
    component: RzElementType, DOMHost: HTMLElement, config: MountConfig
) => {
    let renderLoop: number;
    const stage = new Container();
    const app = new Application({
        width: config.width,
        height: config.height,
        transparent: true,
        antialias: true,
        resolution: 1,
        autoResize: true,
        backgroundColor: config.backgroundColor || 0xffffff
    });

    DOMHost.appendChild(app.renderer.view);

    const PixiEngine = createPixiEngine(app);
    const render = createRenderer(PixiEngine, config.assets || new Set());
    const renderedComponent = await render(createElement(component, config.props), stage);

    const startRenderLoop = () => {
        renderLoop = requestAnimationFrame(() => startRenderLoop());
        app.renderer.render(stage);
    };

    startRenderLoop();

    return {
        component: renderedComponent,
        destroy: () => {
            cancelAnimationFrame(renderLoop);
            unmountComponent(renderedComponent);
            PixiEngine.destroy();
        }
    };
};