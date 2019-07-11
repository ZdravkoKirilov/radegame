import { createElement, WithAsset, WithAssetProps, SpriteProps, Memo } from "@app/render-kit";
import { ImageAsset, Stage } from "@app/game-mechanics";

export type Props = {
    background: ImageAsset;
    stage: Stage;
    selectSlot: Function;
    selectPath: Function;
}

const StageBackground = Memo<Props>(
    ({ background, stage, selectSlot, selectPath }) => {
        return createElement('container', { name: 'background', key: 'gosho' },
            createElement<WithAssetProps>(WithAsset, { url: background.image, },
                createElement('container', {
                    onClick: () => {
                        selectSlot(null);
                        selectPath(null);
                    },

                },
                    createElement<SpriteProps>('sprite', {
                        image: background.image,
                        styles: {
                            x: 0,
                            y: 0,
                            width: stage.width,
                            height: stage.height,
                        },
                    }))
            ),
        );
    },
    ['background']
);

export default StageBackground;