import * as Pixi from 'pixi.js';
import { Ticker } from 'pixi.js';
import { Container, Application } from 'pixi.js';

import { AbstractRenderEngine, MountConfig, createRenderer, createElement, RzElementType, unmountComponent } from "@app/render-kit";

import { PixiFactory } from "./factory";
import { PixiMutator } from "./mutator";
import { PixiLoader } from "./loader";
import { PixiDelegationEventsManager } from './events/DelegationEventsManager';

const ticker = Ticker.shared;
ticker.autoStart = false;
ticker.stop();

const createPixiEngine = (app: Pixi.Application, document: Document): AbstractRenderEngine => {
    const factory = new PixiFactory(document);
    const mutator = new PixiMutator();
    const event = new PixiDelegationEventsManager(app.renderer.plugins.interaction, document);

    return {
        factory,
        mutator,
        event,
        loader: () => new PixiLoader(),
        app,
        destroy: () => {
            event.onDestroy();
        },
    };
}

export async function mountPixi<T>(
    component: RzElementType,
    DOMHost: HTMLElement,
    config: MountConfig<T>
) {
    let renderLoop: number;
    const stage = new Container();
    const app = new Application({
        width: config.width,
        height: config.height,
        transparent: true,
        antialias: true,
        resolution: 1,
        backgroundColor: config.backgroundColor || 0xffffff,
        autoDensity: true,
    });

    DOMHost.appendChild(app.renderer.view);

    const PixiEngine = createPixiEngine(app, DOMHost.ownerDocument);
    config.registerComponents && config.registerComponents(PixiEngine);
    const render = createRenderer(PixiEngine, config.assets || new Set());
    const renderedComponent = await render(createElement(component, config.props), stage);
    const startRenderLoop = () => {
        renderLoop = requestAnimationFrame(startRenderLoop);
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
