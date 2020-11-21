import { RenderFunction, createElement } from "@app/render-kit";

import { RuntimeToken, Style, Token, Widget } from "../../entities";
import { connectToStore } from "../../hocs";
import { RootWidgetProps, RootWidget } from "./RootWidget";

export type RootItemProps = {
  token: Token;
  style?: Style;
  fromParent?: {};
}

type StoreProps = {
  runtimeToken: RuntimeToken;
  template: Widget;
}

type Props = RootItemProps & StoreProps;

const rootItem: RenderFunction<Props | any> = ({ template, runtimeToken, style, fromParent }) => {
  return createElement<RootWidgetProps>(
    RootWidget,
    {
      widget: template,
      fromParent: {
        ...fromParent,
        token: runtimeToken
      },
      style,
    }
  ) as any;
};

const mapStateToProps = (): StoreProps => ({
  runtimeToken: null, // selectRuntimeToken(ownProps.token)(state),
  template: null, //selectTokenTemplate(ownProps.token)(state),
} as any);

export const RootItem = connectToStore(mapStateToProps)(rootItem);