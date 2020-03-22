import { LoaderResources, LoaderResource, AbstractLoader } from "../interfaces";

type Callback = (resource: LoaderResource, allResources?: LoaderResources) => void;

export class AssetManager {

    private handlers: Set<Callback> = new Set([]);

    private data: Partial<{
        textures: LoaderResources;
    }> = {}

    constructor(private loaderFactory: () => AbstractLoader) { }

    async addMany(urls: Set<string>) {
        const loader = this.loaderFactory();
        const result = await loader.loadAll(urls);
        this.data.textures = { ...this.data.textures, ...result };
        this.handlers.forEach(cb => cb(null, this.data.textures));
    }

    add(resourceUrl: string) {
        if (!this.getTexture(resourceUrl)) {
            const loader = this.loaderFactory();
            loader.loadOne(resourceUrl).then(asset => {
                this.data.textures[resourceUrl] = asset;
                this.handlers.forEach(cb => cb(asset, this.data.textures));
            });
        }
    }

    getTexture(key: string) {
        const file = this.data.textures[key];
        return file ? file.texture : null;
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