import { Sprite, Texture, DisplayObject, Container } from 'pixi.js';
import { Subject } from 'rxjs/Subject';

import { BaseProps, BaseObjectChangeEvent } from '../../models';
import { BaseObject } from '../../interfaces';
import { draggable } from '../../mixins';

export type PixiSpriteProps = BaseProps & { image: Texture }

@draggable
export class PixiSprite implements BaseObject {

    public change: Subject<BaseObjectChangeEvent> = new Subject();

    public face: Sprite;
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

    constructor(public readonly parent: BaseObject, props: PixiSpriteProps, ) {
        // this.display = new Sprite(props.image);
        // this.props = props;
        this.face = null;
        this.props = null;
    }

    render(container: Container): void {
        this.container = container;
        container.addChild(this.face);
    }

    update(props: PixiSpriteProps): void {
        if (props) {
            Object.keys(props.mapped).forEach(key => {
                this.face[key] = props[key];
            });
        }
    }
}

