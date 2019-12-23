import { Stage } from "./Stage.model";
import { WithStyle, BaseModel } from "./Base.model";
import { Omit } from "@app/shared";

export type ImageAsset = BaseModel & Partial<{
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