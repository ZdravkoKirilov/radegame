import { createElement, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import { ShapeSlotProps, ShapeSlot, RuntimeSlot, connectToStore, RuntimeShape, combineStyles, selectSlotStyleSync } from "@app/game-mechanics";
import { selectRuntimeShape } from '../../state';

export type EnhancedShapeSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    shape: RuntimeShape;
};

type Props = EnhancedShapeSlotProps & StoreProps;

class EnhancedShapeSlot extends StatefulComponent<Props> {
    render() {
        const self = this;
        const { shape, data } = this.props;

        const slotStyle = selectSlotStyleSync(data, self);
        const composedStyle = combineStyles(shape, slotStyle);
        return createElement<ShapeSlotProps>(ShapeSlot, { style: composedStyle, shape });
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    shape: selectRuntimeShape(ownProps.data.shape)(state),
});

export default connectToStore(mapStateToProps)(EnhancedShapeSlot);