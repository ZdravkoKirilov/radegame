import { compose } from 'lodash/fp';

import { RenderFunction, createElement, CurriedMemo, Memo, CompositeType } from "@app/render-kit";
import { RuntimeSlot } from '../../../entities';
import { withDispatcher, connect } from '../../../hocs';
import { AppState } from '@app/core';
import { assignHandlers, ExpressionContext } from '../../../helpers';
import { GameTemplate } from '../../../models';
import { GameBroadcastService } from '../../../services/game-broadcast/game-broadcast.service';
import { selectExpressionContext, selectConfig } from '@app/game-arena';

import FrameSlot from '../frame-slot';
import ItemSlot from '../item-slot';
import ShapeSlot from '../shape-slot';
import StageSlot from '../stage-slot';
import TextSlot from '../text-slot';

type BasicProps = { data: RuntimeSlot };

export type SlotFacadeProps = BasicProps & {
    forFrame: CompositeType<BasicProps>;
    forItem: CompositeType<BasicProps>;
    forShape: CompositeType<BasicProps>;
    forStage: CompositeType<BasicProps>;
    forText: CompositeType<BasicProps>;
};

export const FacadeSlot = Memo<SlotFacadeProps>(({ data, forItem, forFrame, forText, forStage, forShape }) => {
    if (data.board) {
        return createElement(forStage, { data });
    }
    if (data.display_text) {
        return createElement(forText, { data });
    }
    if (data.shape) {
        return createElement(forShape, { data });
    }
    if (data.item) {
        return createElement(forItem, { data });
    }

    throw new Error('Undetermined slot type: ' + data.name);

}, ['data']);


export type EnhancedSlotFacadeProps = StoreProps & HOCProps & BasicProps;

type StoreProps = Partial<{
    conf: GameTemplate;
    expressionContext: ExpressionContext;
}>;

type HOCProps = Partial<{
    dispatcher: GameBroadcastService;
}>;

const EnhancedFacadeSlot: RenderFunction<EnhancedSlotFacadeProps> = ({ data, conf, expressionContext, dispatcher }) => {
    return conf ? (
        createElement(
            'container',
            {
                ...assignHandlers({
                    context: expressionContext,
                    dispatcher,
                    payload: data,
                    handlers: data.handlers,
                    conf,
                }),
                button: true,
            },
            createElement<SlotFacadeProps>(
                FacadeSlot,
                {
                    data,
                    forFrame: FrameSlot,
                    forItem: ItemSlot,
                    forShape: ShapeSlot,
                    forStage: StageSlot,
                    forText: TextSlot,
                }
            ),
        )
    ) : null;
};

const mapStateToProps = (state: AppState): StoreProps => ({
    conf: selectConfig(state),
    expressionContext: selectExpressionContext(state),
});

export default compose(connect(mapStateToProps), withDispatcher, CurriedMemo())(EnhancedFacadeSlot);
