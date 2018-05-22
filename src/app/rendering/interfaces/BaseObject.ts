import { BaseProps } from '../models';
import { EventEmitter } from '../helpers';

export abstract class BaseObject {

    abstract __face__: any;
    abstract __children__: {
        [key: string]: BaseObject;
    }
    abstract props: any;
    abstract state: any;
    abstract __parent__?: BaseObject;
    abstract __container?: any;
    abstract template?: string;
    abstract stateless: boolean;

    get children() {
        return this.__children__;
    }

    abstract setProps(newProps: any): void;
    abstract setState(newState: any): void;

    abstract change: EventEmitter<BaseProps>;

    abstract render(): string;
    abstract remove(): void;
    abstract shouldUpdate(): boolean;
    abstract willReceiveProps(props: any): BaseProps;
    abstract willMount(): void;
    abstract didMount(): void;
    abstract willUnmount(): void;
    abstract willUpdate(props: any, state: any): any;
    abstract didUpdate(): void;
}

export type StatelessObject = (props: BaseProps) => StatelessElement;

export type StatelessElement = { template?: string, context?: any };