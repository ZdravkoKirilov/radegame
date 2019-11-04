import { compose } from 'lodash/fp';

import { RenderFunction, createElement, CurriedMemo, Memo, CompositeType } from "@app/render-kit";
import { Slot } from '../../../entities';
import { withDispatcher, connect } from '../../../hocs';
import { AppState } from '@app/core';
import { assignHandlers, ExpressionContext } from '../../../resolvers';
import { GameTemplate } from '../../../models';
import { GameBroadcastService } from '../../../services/game-broadcast/game-broadcast.service';
import { selectExpressionContext, selectConfig } from 'app/game-arena/state/selectors/game-state2';

import ImageSlot from '../image-slot';
import ItemSlot from '../item-slot';
import ShapeSlot from '../shape-slot';
import StageSlot from '../stage-slot';
import TextSlot from '../text-slot';

type BasicProps = { data: Slot };

export type SlotFacadeProps = BasicProps & {
    forImage: CompositeType<BasicProps>;
    forItem: CompositeType<BasicProps>;
    forShape: CompositeType<BasicProps>;
    forStage: CompositeType<BasicProps>;
    forText: CompositeType<BasicProps>;
};

export const FacadeSlot = Memo<SlotFacadeProps>(({ data, forItem, forImage, forText, forStage, forShape }) => {
    if (data.board) {
        return createElement(forStage, { data });
    }
    if (data.display_text) {
        return createElement(forText, { data });
    }
    if (data.shape) {
        return createElement(forShape, { data });
    }
    if (data.items.length) {
        return createElement(forItem, { data });
    }
    if (data.frames && data.frames.length) {
        return createElement(forImage, { data });
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
                    forImage: ImageSlot,
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
