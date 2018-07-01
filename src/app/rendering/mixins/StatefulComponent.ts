import { BasicComponent } from "./BasicComponent";
import { BaseProps } from "../models";

export class StatefulComponent<P extends BaseProps, S> extends BasicComponent{
    static composite = true;
    basic = false;

    state: S;
    props: P;

    constructor(props: P, graphic: any) {
        super(props, graphic);
    }

    setState(state: S) {
        this.state = { ...this.state || {}, ...state || {} } as S;
        if (this.shouldUpdate(this.props, state)) {
            this.update();
        }
    }

    setProps(props: P | any) {
        const current = this.props || {};
        this.props = { ...current, ...props };
        if (this.shouldUpdate(props, this.state)) {
            this.update();
        }
    }

    shouldUpdate(nextProps: P, nextState: S) {
        return true;
    }

    render(): any {
        throw new Error('Render not implemented!');
    }
}