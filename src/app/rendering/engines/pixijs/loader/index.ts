import * as PIXI from "pixi.js-legacy";
import { AbstractLoader } from "@app/rendering";
import { LoaderResources } from "../../../interfaces";

export class PixiLoader implements AbstractLoader {
    loader: PIXI.Loader;
    constructor() {
        this.loader = new PIXI.Loader();
    }
    loadAll(assets: Set<string>): Promise<LoaderResources> {
        return new Promise((resolve, reject) => {
            assets.forEach(elem => this.loader.add(elem));

            this.loader.load((self, resources) => {
                resolve(resources);
            });
        });
    }
};