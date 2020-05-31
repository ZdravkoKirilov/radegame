import { createElement, RenderFunction, SpriteProps, WithAssets, WithAssetProps } from '../../internal';

export const DynamicSprite: RenderFunction<SpriteProps> = props => {
    return props.image ? createElement<WithAssetProps>(
        WithAssets, { urls: [props.image] },
        createElement<SpriteProps>(
            'sprite',
            { ...props },
        ),
    ) : null;
};