import { RenderFunction, createElement } from "@app/render-kit";

import { connectToStore } from "../../hocs";
import { Text, RuntimeText, Style } from "../../entities";
import { CommonGameStore, selectRuntimeText } from "../../helpers";
import { BasicTextNode, BasicTextNodeProps } from "../presentational";

export type RootTextProps = {
  text: Text;
  style?: Style;
  fromParent?: {};
};

type StoreProps = {
  runtimeText: RuntimeText;
}

type Props = RootTextProps & StoreProps;

const rootText: RenderFunction<Props> = ({ runtimeText, style }) => {
  return createElement<BasicTextNodeProps>(BasicTextNode, { text: runtimeText.computed_value, style });
};

const mapStateToProps = (state: CommonGameStore, ownProps: RootTextProps): StoreProps => ({
  runtimeText: selectRuntimeText(ownProps.text)(state),
});

export const RootText = connectToStore(mapStateToProps)(rootText);