import { Style } from "../../entities";
import { createElement, PrimitiveRectangleProps } from "@app/render-kit";

export type BasicRectangleProps = {
  style: Style;
}

const BasicRectangle: any = ({ style }: any) => {

  return createElement<PrimitiveRectangleProps>('rectangle', {
    styles: {
      stroke_thickness: style.stroke_thickness,
      stroke_color: style.stroke_color,
      fill: style.fill,
      x: style.x || 0,
      y: style.y || 0,
      width: Number(style.width),
      height: Number(style.height),
      border_radius: style.border_radius,
      opacity: style.opacity,
    }
  });
};

export default BasicRectangle; 