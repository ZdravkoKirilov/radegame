import { BasicComponent } from "./BasicComponent";
import { RzElementProps, RzElement } from "../models";
import { Lifecycles } from "../interfaces";

export class StatefulComponent<P extends RzElementProps, S> extends BasicComponent {

    state: S;
    props: P;

    constructor(props: P) {
        super(props, null);
    }

    setState(state: S) {
        const current = this.state || {};
        const next = { ...current, ...state || {} };
        if (this.shouldUpdate(this.props, state)) {
            this.state = next as S;
            this.update();
        } else {
            this.state = next as S;
        }
    }

    setProps(props: P | any) {
        const current = this.props || {};
        const next = { ...current, ...props };

        if (this.shouldUpdate(next, this.state)) {
            this.props = next as P;
            this.update();
        } else {
            this.props = next as P;
        }
    }

    shouldUpdate(nextProps: P, nextState: S) {
        return true;
    }

    render(): RzElement {
        throw new Error('Render not implemented!');
    }
}