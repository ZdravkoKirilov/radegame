import { BasicComponent, StatelessComponent, StatefulComponent } from "../mixins";
import { BaseProps } from "../models";

export type CompositeComponent = StatelessComponent<BaseProps> | StatefulComponent<BaseProps, any>;
export type Component = BasicComponent | CompositeComponent;

export type StatelessElement = {
    template: string;
    context?: BaseProps & any;
};