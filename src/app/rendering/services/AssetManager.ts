import { LoaderResources, LoaderResource, AbstractLoader } from "../interfaces";

type Callback = (resource: LoaderResource, allResources: LoaderResources) => void;

export class AssetManager {

    private handlers: Set<Callback> = new Set([]);

    private data: Partial<{
        textures: LoaderResources;
    }> = {}

    constructor(private loader: AbstractLoader) {

    }

    add(resourceUrl: string) {
        this.loader.loadOne(resourceUrl).then(asset => {
            this.data.textures[resourceUrl] = asset;
            this.handlers.forEach(cb => cb(asset, this.data.textures));
        })
    }

    getTexture(key: string) {
        return this.data.textures[key];
    }

    subscribe = (callback: Callback) => {
        this.handlers.add(callback);

        return {
            unsubscribe: () => {
                this.handlers.delete(callback);
            }
        }
    }
}

export interface AssetManagerSubscription {
    unsubscribe(): void;
}