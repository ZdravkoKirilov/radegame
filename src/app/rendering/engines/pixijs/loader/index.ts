import * as PIXI from "pixi.js-legacy";
import { AbstractLoader, LoaderResources, LoaderResource } from "@app/rendering";

export class PixiLoader implements AbstractLoader {
    loader: PIXI.Loader;
    constructor() {
        this.loader = new PIXI.Loader();
    }
    loadAll(assets: Set<string>): Promise<LoaderResources> {
        return new Promise((resolve, reject) => {
            assets.forEach(elem => this.loader.add(elem));

            this.loader.load((loader, resources) => {
                resolve(resources);
                loader.loading = false;
            });
            //this.loader.onLoad.add
        });
    }
    loadOne(asset: string): Promise<LoaderResource> {
        return new Promise(resolve => {
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
};