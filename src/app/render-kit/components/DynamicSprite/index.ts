import { createElement } from '../../helpers/create-element';
import { RenderFunction } from '../../models';
import { SpriteProps } from '../../primitives';
import { WithAssets, WithAssetProps } from '../WithAssets';

export const DynamicSprite: RenderFunction<SpriteProps> = props => {
    return props.image ? createElement<WithAssetProps>(
        WithAssets, { urls: [props.image] },
        createElement<SpriteProps>(
            'sprite',
            { ...props },
        ),
    ) : null;
};