import { createElement, WithAsset, WithAssetProps, SpriteProps, RenderFunction } from "@app/rendering";
import { ImageAsset, Stage } from "@app/game-mechanics";

export type Props = {
    background: ImageAsset;
    stage: Stage;
    selectSlot: Function;
    selectPath: Function;
}

const StageBackground: RenderFunction<Props> = ({ background, stage, selectSlot, selectPath }) => {
    return createElement('container', null,
        createElement<WithAssetProps>(WithAsset, { url: background.image },
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
};

export default StageBackground;