import { compose } from 'lodash/fp';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { RenderFunction, createElement, Memo } from "@app/render-kit";
import EmptySlot, { Props as EmptySlotProps } from "../empty-slot";
import { Slot, Style, ImageAsset } from '../../../../entities';
import { withStore, withDispatcher } from '../../../../hocs';
import { AppState } from '@app/core';
import { selectSlotStyle, selectSlotImage, selectGameConfig, selectExpressionContext } from '@app/game-arena';
import { assignHandlers, ExpressionContext } from '../../../../resolvers';
import { GameTemplate } from '../../../../models';
import { GameBroadcastService } from '../../../../services';

type HOCProps = {
    store: Store<AppState>;
    dispatcher: GameBroadcastService;
}

export type Props = Partial<HOCProps> & {
    data: Slot;
};

const StaticNode: RenderFunction<Props> = ({ data, store, dispatcher }, { useState, useEffect }) => {
    const emptySlot = !data.board;
    const [style, setStyle] = useState<Style>(null);
    const [image, setImage] = useState<ImageAsset>(null);
    const [conf, setConf] = useState<GameTemplate>(null);
    const [exprContext, setExprContext] = useState<ExpressionContext>(null);

    useEffect(() => {
        const subs = [
            store.pipe(select(selectSlotStyle(data.id)), map(style => setStyle(style))).subscribe(),
            store.pipe(select(selectSlotImage(data.id)), map(image => setImage(image))).subscribe(),
            store.pipe(select(selectGameConfig), map(config => setConf(config))).subscribe(),
            store.pipe(select(selectExpressionContext), map(ctx => setExprContext(ctx))).subscribe(),
        ];
        return () => subs.forEach(sub => sub.unsubscribe());
    }, []);

    return style && conf ? createElement('container', {
        ...assignHandlers({
            context: exprContext,
            dispatcher,
            payload: data,
            handlers: data.handlers,
            conf,
        }),
    },
        createElement('rectangle', {
            button: true,
            styles: {
                strokeThickness: style.strokeThickness,
                strokeColor: style.strokeColor,
                x: 0,
                y: 0,
                width: style.width + 10,
                height: style.height + 35,
                borderRadius: 5,
                radius: style.width
            }
        }),
        emptySlot && image ? createElement<EmptySlotProps>(EmptySlot, { style, image: image.image, data }) : null,
    ) : null;
};

export default compose(withStore, withDispatcher, Memo)(StaticNode);