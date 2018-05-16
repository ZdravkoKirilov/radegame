import { Container, DisplayObject, Application } from "pixi.js";

import { BaseObject } from "../../interfaces";
import { BaseProps } from "../../models";
import { factory } from "../../helpers";

export class PixiContainer implements BaseObject<Container> {

    public face: Container;
    public container: Container | Application;

    private _props: BaseProps;

    set props(data: BaseProps) {
        const current = this.props || {} as BaseProps;

        this._props = { ...current, ...data };
        this.update(data, current);
    }

    get props(): BaseProps {
        return this._props;
    }

    constructor(public readonly parent: BaseObject<DisplayObject>, props: BaseProps) {
        this.face = new Container();
        this.props = props;
    }

    render(container: Container): void {
        this.container = container;
        if (container instanceof Application) {
            container.stage.addChild(this.face);
        } else {
            container.addChild(this.face);
        }

        this.render_children();
    }

    render_children() {

        this.props.children.forEach(child => {
            const elem = factory(child, this);
            elem.render(this.face);
        });
    }

    update(props: BaseProps, prevProps: BaseProps): void {
        if (props) {
            Object.keys(props.mapped).forEach(key => {
                this.face[key] = props[key];
            });
        }
        if (props.children !== prevProps.children) {
            this.face.removeChildren();
            this.render_children();
            // will distort children state // need reconciliation algorithm
        }
    }

    remove() {
        this.face.destroy();
    }
}