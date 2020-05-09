import { RuntimeImageFrame, Style, Widget } from "../../entities";
import { RenderFunction, createElement, SpriteProps, DynamicSprite, RzElement } from "@app/render-kit";
import { combineStyles } from "../../helpers";

export type FrameRendererProps = {
    renderWidget: (widget: Widget, style: Style) => RzElement;
    frame: RuntimeImageFrame;
    style: Style;
};

export const FrameRenderer: RenderFunction<FrameRendererProps> = ({ frame, renderWidget, style }) => {
    const composedStyle = combineStyles(style, frame);

    if (frame.widget) {
        return renderWidget(frame.widget, style);
    }

    if (frame.image) {
        return createElement<SpriteProps>(DynamicSprite, {
            image: frame.image.image, styles: {
                width: composedStyle.width,
                height: composedStyle.height,
                x: 0,
                y: 0,
            }
        });
    }
};