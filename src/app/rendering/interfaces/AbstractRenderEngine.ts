import { AbstractFactory } from "./AbstractFactory";
import { AbstractMutator } from "./AbstractMutator";
import { AbstractEnhancer } from "./AbstractEnhancer";
import { AbstractEvent } from "./AbstractEvent";
import { AbstractLoader } from "./AbstractLoader";

export interface AbstractRenderEngine {
    factory: AbstractFactory;
    mutator: AbstractMutator;
    enhancer: AbstractEnhancer;
    event: AbstractEvent;
    loader: AbstractLoader;
    app: any;
};