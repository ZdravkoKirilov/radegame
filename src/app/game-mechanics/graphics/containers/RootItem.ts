import { RenderFunction, createElement } from "@app/render-kit";

import { NodeItem, RuntimeNodeItem, Style, Widget } from "../../entities";
import { connectToStore } from "../../hocs";
import { CommonGameStore, selectItemTemplate, selectRuntimeItem } from "../../helpers";
import { RootWidgetProps, RootWidget } from "./RootWidget";

export type RootItemProps = {
  item: NodeItem;
  style?: Style;
  fromParent?: {};
}

type StoreProps = {
  runtimeItem: RuntimeNodeItem;
  template: Widget;
}

type Props = RootItemProps & StoreProps;

const rootItem: RenderFunction<Props> = ({ template, runtimeItem, style, fromParent }) => {
  return createElement<RootWidgetProps>(
    RootWidget,
    {
      widget: template,
      fromParent: {
        ...fromParent,
        item: runtimeItem.choice || runtimeItem.token
      },
      style,
    }
  );
};

const mapStateToProps = (state: CommonGameStore, ownProps: RootItemProps): StoreProps => ({
  runtimeItem: selectRuntimeItem(ownProps.item)(state),
  template: selectItemTemplate(ownProps.item)(state),
});

export const RootItem = connectToStore(mapStateToProps)(rootItem);