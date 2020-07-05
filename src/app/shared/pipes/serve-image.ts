import { Injectable, Pipe, PipeTransform } from "@angular/core";

import { Dictionary } from "../utils";
import { ImageAsset, ImageAssetId } from "@app/game-mechanics";

@Injectable({ providedIn: 'root' })
@Pipe({
    name: 'serveImage'
})
export class ServeImagePipe implements PipeTransform {
    transform(value: ImageAssetId, images: Dictionary<ImageAsset> | ImageAsset[], mode: 'thumb' | 'big' = 'thumb') {
        const image = Array.isArray(images) ? images.find(elem => elem.id === value) : images[value];
        if (image) {
            return mode === 'thumb' ? image.thumbnail : image.image;
        } else {
            return value;
        }
    }
}