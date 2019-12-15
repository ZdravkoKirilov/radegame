import { Stage } from "./Stage.model";
import { WithStyle } from "./Base.model";
import { Omit } from "@app/shared";

export type ImageAsset = Partial<{
    id: number;
    game: number;

    name: string;
    image: string;
    thumbnail: string;
    svg: string;
    keywords: string;
}>

export type ImageFrame = WithStyle & Partial<{
    id: number;
    owner: number;

    image: number;
    stage: number;
}>

export type RuntimeImageFrame = Omit<ImageFrame, 'image' | 'stage'> & {
    image: ImageAsset;
    stage: Stage;
}