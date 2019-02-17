import { Injectable, Pipe, PipeTransform } from "@angular/core";

import { Dictionary } from "../utils";
import { ImageAsset } from "@app/game-mechanics";

@Injectable({providedIn: 'root'})
@Pipe({
    name: 'serveImage'
})
export class ServeImagePipe implements PipeTransform {
    transform(value: number, images: Dictionary<ImageAsset>, mode: 'thumb' | 'big' = 'thumb') {
        const image = images[value];

        if (image) {
            return mode === 'thumb' ? image.thumbnail : image.image;
        } else {
            return value;
        }
    }
}