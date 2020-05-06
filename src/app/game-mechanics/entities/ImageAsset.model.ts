import { Widget } from "./Widget.model";
import { WithStyle, BaseModel } from "./Base.model";
import { Omit } from "@app/shared";
import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { RzStyles } from "@app/render-kit";

export type ImageAsset = BaseModel & Partial<{
    image: string;
    thumbnail: string;
    svg: string;
    keywords: string;
}>

export type ImageFrame = WithStyle & Partial<{
    id: number;
    owner: number;
    name: string;

    image: number;
    widget: number;
}>

export type RuntimeImageFrame = Omit<ImageFrame, 'image' | 'widget' | 'style' | 'style_inline'> & {
    image: ImageAsset;
    widget: Widget;
    style: ParamedExpressionFunc<RuntimeImageFrame, Style>;
    style_inline: RzStyles;
}