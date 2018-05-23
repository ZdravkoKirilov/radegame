import { BasicComponent, StatelessComponent, CompositeComponent } from "../mixins";
import { BaseProps } from "../models";

export type Component = BasicComponent | StatelessComponent<BaseProps> | CompositeComponent<BaseProps, any>;

export type StatelessElement = {
    template: string;
    context?: BaseProps & any;
};