import { RuntimeStage } from "./Stage.model";
import { WithStyle, BaseModel } from "./Base.model";
import { Omit } from "@app/shared";
import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";

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

export type RuntimeImageFrame = Omit<ImageFrame, 'image' | 'stage' | 'style'> & {
    image: ImageAsset;
    stage: RuntimeStage;
    style: ParamedExpressionFunc<RuntimeImageFrame, Style>;
}