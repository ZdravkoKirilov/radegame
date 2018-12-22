import { createElement } from '../../helpers/create-element';
import { RenderFunction } from '../../models';
import { SpriteProps } from '../../primitives';
import { WithAsset, WithAssetProps } from '../WithAsset';

export const DynamicSprite: RenderFunction<SpriteProps> = props => {
    return props.image ? createElement<WithAssetProps>(
        WithAsset, { url: props.image },
        createElement<SpriteProps>('sprite', { ...props }),
    ) : null;
};