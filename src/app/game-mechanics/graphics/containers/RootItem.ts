import { RenderFunction, createElement } from "@app/render-kit";

import { RuntimeToken, Style, Token, Widget } from "../../entities";
import { connectToStore } from "../../hocs";
import { CommonGameStore } from "../../helpers";
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

const rootItem: RenderFunction<Props> = ({ template, runtimeToken, style, fromParent }) => {
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
  );
};

const mapStateToProps = (state: CommonGameStore, ownProps: RootItemProps): StoreProps => ({
  runtimeToken: null, // selectRuntimeToken(ownProps.token)(state),
  template: null, //selectTokenTemplate(ownProps.token)(state),
});

export const RootItem = connectToStore(mapStateToProps)(rootItem);