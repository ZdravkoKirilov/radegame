import {
    RenderFunction, createElement, Memo, RzTransition, AnimatableProps, TransitionProps
} from "@app/render-kit";
import { Style, Slot, Shape, RuntimeTransition } from "../../../entities";
import { connect } from "../../../hocs";
import { AppState } from "@app/core";
import {
    selectSlotStyle,
    selectSlotTransitions, selectSlotShape
} from "@app/game-arena";

import Rectangle, { RectangleProps } from './Rectangle';
import Circle, { CircleSlotProps } from './Circle';
import Polygon, { PolygonSlotProps } from './Polygon';
import Line, { LineSlotProps } from './Line';
import Ellipse, { EllipseSlotProps } from './Ellipse';

export type ShapeSlotProps = {
    style: Style;
    shape: Shape;
}

export const ShapeSlot: RenderFunction<ShapeSlotProps & StoreProps> = ({ style, shape }) => {

    if (shape.type === 'rectange') {
        return createElement<RectangleProps>(Rectangle, { style, shape });
    }
    if (shape.type === 'circle') {
        return createElement<CircleSlotProps>(Circle, { style, shape });
    }
    if (shape.type === 'polygon') {
        return createElement<PolygonSlotProps>(Polygon, { style, shape });
    }
    if (shape.type === 'line') {
        return createElement<LineSlotProps>(Line, { style, shape });
    }
    if (shape.type === 'ellipse') {
        return createElement<EllipseSlotProps>(Ellipse, { style, shape });
    }
};

type EnhancedShapeSlotProps = {
    data: Slot;
}

type StoreProps = {
    style: Style;
    shape: Shape;
    transitions: RuntimeTransition[];
};

const EnhancedShapeSlot = Memo<EnhancedShapeSlotProps & StoreProps>(({ style, shape, transitions = [] }) => {

    return createElement<TransitionProps>(
        RzTransition,
        { transitions, target: {}, context: {} as any },
        (transitionStyle: AnimatableProps | any) => {
            const composedStyle: Style = { ...style, ...shape.style_inline, ...transitionStyle };
            return shape ?
                createElement<ShapeSlotProps>(ShapeSlot, { style: composedStyle, shape }) :
                null;
        }
    );
});

const mapStateToProps = (state: AppState, ownProps: EnhancedShapeSlotProps): StoreProps => ({
    style: selectSlotStyle(ownProps.data.id)(state),
    shape: selectSlotShape(ownProps.data.id)(state),
    transitions: selectSlotTransitions(ownProps.data.id)(state),
});

export default connect(mapStateToProps)(EnhancedShapeSlot);