import { AbstractLoader, LoaderResources, LoaderResource } from "@app/render-kit";
import { loaders } from "pixi.js";

export class PixiLoader implements AbstractLoader {
    loader: loaders.Loader;

    get isBusy() {
        return this.loader.loading;
    }
    constructor() {
        this.loader = new loaders.Loader;
    }
    loadAll(assets: Set<string>): Promise<LoaderResources> {
        return new Promise((resolve, reject) => {
            if (this.loader.loading) {
                reject("Loader is busy loading another resource");
            }
            assets.forEach(elem => this.loader.add(elem));

            this.loader.load((loader, resources) => {
                resolve(resources);
                loader.loading = false;
            });
        });
    }
    loadOne(asset: string): Promise<LoaderResource> {
        return new Promise((resolve, reject) => {
            if (this.loader.loading) {
                reject("Loader is busy loading another resource");
            }

            if (this.loader.resources[asset]) {
                resolve(this.loader.resources[asset]);
            } else {
                this.loader.add(asset);
                this.loader.load((loader, resources) => {
                    resolve(resources[asset]);
                })
            };
        });
    }
    get isLoading() {
        return this.loader.loading;
    }
};