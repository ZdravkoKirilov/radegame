import { BasicComponent, FunctionalComponent, StatefulComponent } from "../mixins";
import { BaseProps, RzElementProps } from "../models";

export type CompositeComponent = FunctionalComponent<RzElementProps> | StatefulComponent<RzElementProps, any>;
export type Component = BasicComponent | CompositeComponent;

export type StatelessElement = {
    template: string;
    context?: BaseProps & any;
};

export const isStateful = (component: StatefulComponent<any, any> | FunctionalComponent<any>): component is StatefulComponent<any, any> => {
    return 'composite' in component;
};

export const isComposite = (component: Component): component is CompositeComponent => {
    return component instanceof StatefulComponent || component instanceof FunctionalComponent;
};

export interface Lifecycles {
    willReceiveProps?: (props: any) => void;
    willMount?: () => void;
    didMount?: () => void;
    willUnmount?: () => void;
    didUpdate?: () => void;
};
