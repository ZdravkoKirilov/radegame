import { RenderFunction, createElement } from "@app/render-kit";

import { RuntimeWidgetNode, WidgetNode } from "../../entities";
import { CommonGameStore, selectRuntimeNode } from "../../helpers";
import { connectToStore } from "../../hocs";
import NodeFactory, { NodeFactoryProps } from "./Factory";

export type RootNodeProps = {
  node: WidgetNode;
  fromParent?: {};
}

type StoreProps = {
  runtimeNode: RuntimeWidgetNode;
}

type Props = RootNodeProps & StoreProps;

const rootNode: RenderFunction<Props> = ({ runtimeNode, fromParent }) => {
  return (
    createElement<NodeFactoryProps>(
      NodeFactory,
      { data: runtimeNode, fromParent }
    )
  )
};

const mapStateToProps = (state: CommonGameStore, ownProps: RootNodeProps): StoreProps => ({
  runtimeNode: selectRuntimeNode(ownProps.node)(state)
});

export const RootNode = connectToStore(mapStateToProps)(rootNode);
export default RootNode;