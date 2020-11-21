import { RenderFunction, createElement } from "@app/render-kit";

import { connectToStore } from "../../hocs";
import { Style, Shape, RuntimeShape } from "../../entities";
import { CommonGameStore, selectRuntimeShape, combineStyles } from "../../helpers";
import { BasicShapeNodeProps, BasicShapeNode } from "../presentational";

export type RootShapeProps = {
  shape: Shape;
  style?: Style;
  fromParent?: {};
};

type StoreProps = {
  runtimeShape: RuntimeShape;
}

type Props = RootShapeProps & StoreProps;

const rootShape: RenderFunction<Props> = ({ runtimeShape, style, shape }: any) => {
  const composedStyle = combineStyles(runtimeShape, style);
  return createElement<BasicShapeNodeProps>(BasicShapeNode, { style: composedStyle, shape }) as any;
};

const mapStateToProps = (state: CommonGameStore, ownProps: RootShapeProps): StoreProps => ({
  runtimeShape: selectRuntimeShape(ownProps.shape)(state),
});

export const RootShape = connectToStore(mapStateToProps)(rootShape as any);