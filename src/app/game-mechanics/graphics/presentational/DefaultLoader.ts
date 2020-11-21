import { createElement } from "@app/render-kit";

import { BasicTextNode, BasicTextNodeProps } from "./BasicText";
import { Style } from "../../entities";

export type DefaultLoaderProps = Partial<{
  style: Style;
  text: string;
}>;

export const DefaultLoader: any = ({ style = {} as Style, text = 'Loading...' }) => {
  return (
    createElement<BasicTextNodeProps>(BasicTextNode as any, {
      text, style
    })
  )
};