import { createElement, SpriteProps, Memo, DynamicSprite } from "@app/render-kit";
import { ImageAsset, Stage } from "@app/game-mechanics";

export type Props = {
    background: ImageAsset;
    stage: Stage;
    selectSlot: Function;
}

const StageBackground = Memo<Props>(
    ({ background, stage, selectSlot }) => {
        return createElement('container', { name: 'background', key: 'gosho' },

            createElement('container', {
                onClick: () => {
                    selectSlot(null);
                },

            },
                createElement<SpriteProps>(DynamicSprite, {
                    image: background.image,
                    styles: {
                        x: 0,
                        y: 0,
                        width: stage.width,
                        height: stage.height,
                    },
                })
            ),

            createElement('rectangle', {
                button: true,
                styles: {
                    stroke_thickness: 1,
                    stroke_color: 0x49eb34,
                    x: 0,
                    y: 0,
                    width: stage.width,
                    height: stage.height,
                }
            })
        );
    },
    ['background']
);

export default StageBackground;