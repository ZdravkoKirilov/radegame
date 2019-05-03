import * as Pixi from 'pixi.js';

import { AbstractRenderEngine } from "@app/rendering";
import { PixiFactory } from "./factory";
import { PixiEnhancer } from "./enhancers";
import { PixiEventsManager } from "./events";
import { PixiMutator } from "./mutator";
import { PixiLoader } from "./loader";

const ticker = Pixi.ticker.shared;
ticker.autoStart = false;
ticker.stop();

export const createPixiEngine = (app: Pixi.Application): AbstractRenderEngine => {
    return {
        factory: new PixiFactory(),
        mutator: new PixiMutator(),
        enhancer: new PixiEnhancer(),
        event: new PixiEventsManager(),
        loader: new PixiLoader(),
        app
    };
}