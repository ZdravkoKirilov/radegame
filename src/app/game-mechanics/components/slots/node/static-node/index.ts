import { compose } from 'lodash/fp';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { RenderFunction, createElement, Memo, RzStyles, MemoRenderFunction } from "@app/render-kit";
import EmptySlot, { Props as EmptySlotProps } from "../empty-slot";
import { Slot, Style, ImageAsset } from '../../../../entities';
import { withStore, withDispatcher } from '../../../../hocs';
import { AppState } from '@app/core';
import { selectSlotStyle, selectSlotImage, selectGameConfig, selectExpressionContext, isSlotEnabled } from '@app/game-arena';
import { assignHandlers, ExpressionContext } from '../../../../resolvers';
import { GameTemplate } from '../../../../models';
import { GameBroadcastService } from '../../../../services/game-broadcast/game-broadcast.service';

type HOCProps = {
    store: Store<AppState>;
    dispatcher: GameBroadcastService;
}

export type Props = Partial<HOCProps> & {
    data: Slot;
    interpolatedStyle?: Partial<RzStyles>;
};

const StaticNode: RenderFunction<Props> = ({ data, interpolatedStyle, store, dispatcher }, { useState, useEffect }) => {
    const emptySlot = !data.board;
    const [style, setStyle] = useState<Style>(null);
    const [image, setImage] = useState<ImageAsset>(null);
    const [conf, setConf] = useState<GameTemplate>(null);
    const [exprContext, setExprContext] = useState<ExpressionContext>(null);
    const [enabled, setEnabled] = useState<boolean>(false);
    const interpolatedWith = interpolatedStyle && enabled ? interpolatedStyle.width : null;
    const interpolatedHeight = interpolatedStyle && enabled ? interpolatedStyle.height : null;

    useEffect(() => {
        const subs = [
            store.pipe(select(selectSlotStyle(data.id)), map(style => setStyle(style))).subscribe(),
            store.pipe(select(selectSlotImage(data.id)), map(image => setImage(image))).subscribe(),
            store.pipe(select(selectGameConfig), map(config => setConf(config))).subscribe(),
            store.pipe(select(selectExpressionContext), map(ctx => setExprContext(ctx))).subscribe(),
            store.pipe(select(isSlotEnabled(data.id)), map(enabled => setEnabled(enabled))).subscribe(),
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
        button: true,
    },
        createElement('rectangle', {
            styles: {
                stroke_thickness: style.stroke_thickness,
                stroke_color: Number(style.stroke_color),
                x: 0,
                y: 0,
                width: (interpolatedWith || Number(style.width)) + 10,
                height: (interpolatedHeight || Number(style.height)) + 35,
                borderRadius: 5,
                radius: style.width
            }
        }),
        emptySlot ? createElement<EmptySlotProps>(EmptySlot, { style, image: image.image, data }) : null,
    ) : null;
};

export default compose(withStore, withDispatcher, Memo)(StaticNode);