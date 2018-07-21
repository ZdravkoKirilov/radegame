import { PixiFactory } from "./factory";
import { AbstractRenderEngine } from "@app/rendering";
import { PixiEnhancer } from "./enhancers";
import { PixiEventsManager } from "./events";
import { PixiMutator } from "./mutator.ts";
import { PixiLoader } from "./loader";

export const engine: AbstractRenderEngine = {
    factory: new PixiFactory(),
    mutator: new PixiMutator(),
    enhancer: new PixiEnhancer(),
    event: new PixiEventsManager(),
    loader: new PixiLoader()
}