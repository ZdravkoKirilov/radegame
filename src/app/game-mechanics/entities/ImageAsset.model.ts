import { RzStyles } from "@app/render-kit";
import { Omit } from "@app/shared";

import { Widget } from "./Widget.model";
import { WithStyle, BaseModel } from "./Base.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { enrichEntity, parseAndBind } from "../helpers";
import { ExpressionContext } from "../models";

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

export const ImageFrame = {
  toRuntime(context: ExpressionContext, frame: ImageFrame) {
    return enrichEntity<ImageFrame, RuntimeImageFrame>(context.conf, {
      widget: 'widgets',
      image: 'images',
      style: src => parseAndBind(context)(src)
    }, frame);
  }
}

export type RuntimeImageFrame = Omit<ImageFrame, 'image' | 'widget' | 'style' | 'style_inline'> & {
  image: ImageAsset;
  widget: Widget;
  style: ParamedExpressionFunc<RuntimeImageFrame, Style>;
  style_inline: RzStyles;
}