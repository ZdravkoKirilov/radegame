import { AbstractRenderEngine } from "@app/rendering";
import { PixiFactory } from "./factory";
import { PixiEnhancer } from "./enhancers";
import { PixiEventsManager } from "./events";
import { PixiMutator } from "./mutator";
import { PixiLoader } from "./loader";

export const createPixiEngine = (): AbstractRenderEngine => {
    return {
        factory: new PixiFactory(),
        mutator: new PixiMutator(),
        enhancer: new PixiEnhancer(),
        event: new PixiEventsManager(),
        loader: new PixiLoader()
    };
}