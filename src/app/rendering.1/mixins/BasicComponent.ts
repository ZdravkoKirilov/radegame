import { assignEvents, EventPayload } from "../helpers";
import { EventEmitter } from '@app/shared';
import { BaseProps, MetaProps } from "../models";
import { Component } from "../interfaces";
import { assignEnhancers } from "../enhancers";

export class BasicComponent {
    basic = true;
    change: EventEmitter<EventPayload> = new EventEmitter();
    meta: MetaProps;
    props: BaseProps;
    graphic: any;
    container: any;
    parent: Component;
    children: Array<Component> = [];

    get width() {
        return (this.graphic as any).width;
    }

    get height() {
        return (this.graphic as any).height;
    }

    get x() {
        return (this.graphic as any).x;
    }

    get y() {
        return (this.graphic as any).y;
    }

    constructor(props: BaseProps, graphic: any) {
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

    setProps(props: Partial<BaseProps> | any) {
        const current = this.props || {};
        this.props = { ...current, ...props };
        if (this.shouldUpdate(props)) {
            this.update();
        }
    }

    shouldUpdate(nextProps: BaseProps, nextState = null): boolean {
        return true;
    }

    remove() {
        if (this.graphic.parent) {
            // this.graphic.parent.removeChild(this.graphic);
        }

    }

    bringToFront() {
        if (this.graphic.parent) {
            const children = this.graphic.parent.children.filter(elem => elem !== this.graphic);
            children.push(this.graphic);
            this.graphic.parent.children = children;
        }
    }
}