import { createElement, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import { BasicShapeNodeProps, BasicShapeNode, RuntimeWidgetNode, connectToStore, RuntimeShape, combineStyles, selectNodeStyleSync } from "@app/game-mechanics";
import { selectRuntimeShape } from '../../state';

export type EnhancedShapeNodeProps = {
    data: RuntimeWidgetNode;
}

type StoreProps = {
    shape: RuntimeShape;
};

type Props = EnhancedShapeNodeProps & StoreProps;

class EnhancedShapeNode extends StatefulComponent<Props> {
    render() {
        const self = this;
        const { shape, data } = this.props;

        const nodeStyle = selectNodeStyleSync(data, self);
        const composedStyle = combineStyles(shape, nodeStyle);
        return createElement<BasicShapeNodeProps>(BasicShapeNode, { style: composedStyle, shape });
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeNodeProps): StoreProps => ({
    shape: selectRuntimeShape(ownProps.data.shape)(state),
});

export default connectToStore(mapStateToProps)(EnhancedShapeNode);