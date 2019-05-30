import { AbstractContainer } from './AbstractContainer';
import { RzElement, MetaProps, Component } from "../models";

import { Dictionary } from "@app/shared";
import { BasicComponent } from '../bases';

export abstract class AbstractFactory {

    abstract createComponent(element: RzElement, meta: MetaProps): BasicComponent;

    customResolvers?: Array<Dictionary<Component>>;

    addCustomResolver: (config: Dictionary<Component>) => void;
};

export type Renderer = (element: RzElement, meta: MetaProps, container: AbstractContainer) => void;