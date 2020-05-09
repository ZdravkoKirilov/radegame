import { Style } from "../../entities";
import { Memo, createElement, PrimitiveTextProps, RzElementPrimitiveProps } from "@app/render-kit";

export type BasicTextNodeProps = {
    style: Style;
    text: string;
};

export const BasicTextNode = Memo<BasicTextNodeProps>(({ style, text }) => {
    style = style || {};
    text = text || 'Default value';

    return createElement<RzElementPrimitiveProps>(
        'container',
        {
            styles: { opacity: style.opacity, scale: style.scale }
        },
        createElement<PrimitiveTextProps>('text', {
            value: text,
            textStyle: {
                font_size: style.font_size || 18,
                font_family: style.font_family,
                font_style: style.font_style,
                stroke_color: style.stroke_color,
                fill: style.fill || '#1a1b1c',
            }
        }),
    );

}, ['style', 'text']);