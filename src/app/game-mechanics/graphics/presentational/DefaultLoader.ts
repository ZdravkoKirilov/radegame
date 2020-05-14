import { RenderFunction, createElement } from "@app/render-kit";

import { BasicTextNode, BasicTextNodeProps } from "./BasicText";
import { Style } from "../../entities";

export type DefaultLoaderProps = Partial<{
  style: Style;
  text: string;
}>;

export const DefaultLoader: RenderFunction<DefaultLoaderProps> = ({ style = {}, text = 'Loading...' }) => {
  return (
    createElement<BasicTextNodeProps>(BasicTextNode, {
      text, style
    })
  )
};