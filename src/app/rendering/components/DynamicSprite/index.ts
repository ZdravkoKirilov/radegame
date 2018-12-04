import { createElement } from '../../helpers/create-element';
import { RenderFunction } from '../../models';
import { SpriteProps } from '../../primitives';
import { WithAsset, WithAssetProps } from '../WithAsset';

export const DynamicSprite: RenderFunction<SpriteProps> = props => {
    return createElement<WithAssetProps>(
        WithAsset, { url: props.image },
        createElement<SpriteProps>('sprite', { ...props }),
    );
};