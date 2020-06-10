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
            textStyle: style,
        }),
    );

}, ['style', 'text']);