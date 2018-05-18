import { Container, DisplayObject, Application } from "pixi.js";

import { BaseObject } from "../../interfaces";
import { BaseProps } from "../../models";
import { factory } from "../../helpers";
import { DisplayComponent } from "../DisplayComponent";

export class PixiContainer extends DisplayComponent {

    public face: Container;
    public _props: BaseProps;

    constructor(props: BaseProps, parent?: BaseObject) {
        super(props, parent);
        this.face = new Container();
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
}