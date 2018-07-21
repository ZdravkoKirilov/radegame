import { assignEvents } from "../helpers";
import { RzElementProps, MetaProps } from "../models";
import { Component } from "../interfaces";
import { assignEnhancers } from "../enhancers";

export class BasicComponent {
    meta: MetaProps;
    props: RzElementProps;
    graphic: any;
    children: Array<Component> = [];

    constructor(props: RzElementProps, graphic: any) {
        this.graphic = graphic;
        this.props = props;
        setTimeout(() => {
            assignEvents(this, graphic);
            assignEnhancers(this, graphic);
        });
    }

    update() {
        this.meta.patcher(this);
    }

    setProps(props: RzElementProps | any) {
        const current = this.props || {};
        const next = { ...current, ...props };

        if (this.shouldUpdate(next)) {
            this.props = next;
            this.update();
        } else {
            this.props = next;
        }

    }

    remove() {
       // patcher.remove

    }

    shouldUpdate(nextProps: RzElementProps, nextState?: any): boolean;

    shouldUpdate(nextProps: RzElementProps): boolean {
        return true;
    }
}