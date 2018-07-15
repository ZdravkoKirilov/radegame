import { BasicComponent, StatelessComponent, StatefulComponent } from "../mixins";
import { BaseProps } from "../models";

export type CompositeComponent = StatelessComponent<BaseProps> | StatefulComponent<BaseProps, any>;
export type Component = BasicComponent | CompositeComponent;

export type StatelessElement = {
    template: string;
    context?: BaseProps & any;
};

export const isStateful = (component: StatefulComponent<any, any> | StatelessComponent<any>): component is StatefulComponent<any, any> => {
    return 'composite' in component;
};

export const isComposite = (component: Component): component is CompositeComponent => {
    return component instanceof StatefulComponent || component instanceof StatelessComponent;
};

export interface Lifecycles {
    willReceiveProps?: (props: any) => void;
    willMount?: () => void;
    didMount?: () => void;
    willUnmount?: () => void;
    didUpdate?: () => void;
};
