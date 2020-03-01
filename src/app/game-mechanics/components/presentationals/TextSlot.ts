import { Style } from "../../entities";
import { Memo, createElement, PrimitiveTextProps } from "@app/render-kit";

export type TextSlotProps = {
    style: Style;
    text: string;
};

export const TextSlot = Memo<TextSlotProps>(({ style, text }) => {
    style = style || {};
    text = text || 'Default value';

    return createElement<PrimitiveTextProps>('text', {
        value: text,
        textStyle: {
            font_size: style.font_size || 18,
            font_family: style.font_family,
            font_style: style.font_style,
            stroke_color: style.stroke_color || '#1a1b1c',
            fill: style.fill || '#1a1b1c',
        }
    });

}, ['style', 'text']);