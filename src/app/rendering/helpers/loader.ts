import { loaders } from "pixi.js";

import { EventEmitter } from "./event-emitter";

export type LoaderResources = {
    [key: string]: {
        texture: any;
    }
};

export const preloadAssets = (assets: Set<string>): EventEmitter<LoaderResources> => {
    const loader = new loaders.Loader();
    const emitter = new EventEmitter();

    assets.forEach(elem => loader.add(elem));

    loader.load((self, resources) => {
        emitter.emit(resources);
    });

    return emitter;

};

export const extractAssets = (data: Array<object>, keys: Set<string>): Set<string> => {
    const result = new Set<string>();

    data.forEach(elem => {
        keys.forEach(key => {
            const prop = data[key];
            if (prop) {
                result.add(prop);
            }
        });
    });

    return result;
};