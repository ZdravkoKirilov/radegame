import { Sprite, Texture, DisplayObject, Container } from 'pixi.js';

import { BaseObject } from '../../interfaces';
import { BaseProps } from '../../models';

export type PixiSpriteProps = BaseProps & { image: Texture }

export class PixiSprite implements BaseObject {

    public display: DisplayObject;
    public container: Container;
    private _props: PixiSpriteProps;

    set props(data: PixiSpriteProps) {
        const current = this.props || {};
        this._props = { ...current, ...data };
        this.update(data);
    }

    get props(): PixiSpriteProps {
        return this._props;
    }

    constructor(public readonly parent: BaseObject, props: PixiSpriteProps,) {
        this.display = new Sprite(props.image);
        this.props = props;
    }

    render(container: Container): void {
        this.container = container;
        container.addChild(this.display);
    }

    update(props: PixiSpriteProps): void {
        Object.keys(props.mapped).forEach(key => {
            this.display[key] = props[key];
        });
    }
}

