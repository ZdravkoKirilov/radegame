import { Sprite, DisplayObject, Container } from 'pixi.js';
import { Subject } from 'rxjs/Subject';

import { BaseProps } from '../../models';
import { BaseObject } from '../../interfaces';
import { draggable, interactive } from '../../mixins';

@draggable
@interactive({ hoverElem: 'hover' })
export class PixiSprite implements BaseObject<Sprite> {

    public face: Sprite;
    public container: Container;
    private _props: BaseProps;

    set props(data: BaseProps) {
        const current = this.props || {};
        this._props = { ...current, ...data };
        this.update(data);
    }

    get props(): BaseProps {
        return this._props;
    }

    constructor(public readonly parent: BaseObject<DisplayObject>, props: BaseProps) {
        this.face = new Sprite(props.image);
        this.props = props;
    }

    render(container: Container): void {
        this.container = container;
        container.addChild(this.face);
    }

    update(props: BaseProps): void {
        if (props) {
            Object.keys(props.mapped).forEach(key => {
                this.face[key] = props[key];
            });
        }
    }

    remove() {
        this.container.removeChild(this.face);
    }
}

