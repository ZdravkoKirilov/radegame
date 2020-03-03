import { AbstractFactory } from "./AbstractFactory";
import { AbstractMutator } from "./AbstractMutator";
import { AbstractEnhancer } from "./AbstractEnhancer";
import { AbstractEventManager } from "./AbstractEvent";
import { AbstractLoader } from "./AbstractLoader";

export interface AbstractRenderEngine {
    factory: AbstractFactory;
    mutator: AbstractMutator;
    enhancer: AbstractEnhancer;
    event: AbstractEventManager;
    loader: AbstractLoader;
    app: any;
    destroy(): void;
};