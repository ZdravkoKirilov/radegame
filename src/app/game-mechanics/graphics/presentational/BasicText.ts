import { Style } from "../../entities";
import { createElement, PrimitiveTextProps, RzElementPrimitiveProps } from "@app/render-kit";

export type BasicTextNodeProps = {
    style: Style;
    text: string;
};

export const BasicTextNode = ({ style, text }: any) => {
    style = style || {} as Style;
    text = text || 'Default value';

    return createElement<RzElementPrimitiveProps>(
        'container',
        {
            styles: { opacity: style.opacity, scale: style.scale }
        },
        createElement<PrimitiveTextProps>('text', {
            value: text,
            textStyle: style,
        }) as any,
    );

};