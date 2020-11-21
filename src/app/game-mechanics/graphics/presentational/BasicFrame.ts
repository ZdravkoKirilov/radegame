import { Style, Widget } from "../../entities";
import { createElement, SpriteProps, DynamicSprite, RzElement } from "@app/render-kit";
import { combineStyles } from "../../helpers";

export type FrameRendererProps = {
  renderWidget: (widget: Widget, style: Style) => RzElement;
  frame: any;
  style: Style;
};

export const FrameRenderer = ({ frame, renderWidget, style }: any) => {
  const composedStyle = combineStyles(style, frame);
  if (frame.widget) {
    return renderWidget(frame.widget, style);
  }

  if (frame.image) {
    return createElement<SpriteProps>(DynamicSprite as any, {
      image: frame.image.image, styles: {
        width: composedStyle.width,
        height: composedStyle.height,
        x: 0,
        y: 0,
      }
    });
  }
};