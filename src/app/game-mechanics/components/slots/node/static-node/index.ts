import { compose } from 'lodash/fp';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { RenderFunction, createElement, Memo } from "@app/render-kit";
import EmptySlot, { Props as EmptySlotProps } from "../empty-slot";
import { Slot, Style, ImageAsset } from '../../../../entities';
import { withStore } from '../../../../hocs';
import { AppState } from '@app/core';
import { selectSlotStyle, selectSlotImage } from '@app/game-arena';

type StoreProps = {
    store: Store<AppState>;
}

export type Props = Partial<StoreProps> & {
    data: Slot;
};

const StaticNode: RenderFunction<Props> = ({ data, store }, { useState, useEffect }) => {
    const emptySlot = !data.board;
    const [style, setStyle] = useState<Style>(null);
    const [image, setImage] = useState<ImageAsset>(null);

    useEffect(() => {
        const subs = [
            store.pipe(select(selectSlotStyle(data.id)), map(style => setStyle(style))).subscribe(),
            store.pipe(select(selectSlotImage(data.id)), map(image => setImage(image))).subscribe(),

        ];
        return () => subs.forEach(sub => sub.unsubscribe());
    }, []);

    return style ? createElement('container', null,
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
        emptySlot ? createElement<EmptySlotProps>(EmptySlot, { style, image: image.image, data }) : null,
    ) : null;
};

export default compose(withStore, Memo)(StaticNode);