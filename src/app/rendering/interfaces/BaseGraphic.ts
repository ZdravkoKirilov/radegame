import { BaseContainer } from './BaseContainer';

export abstract class BaseGraphic {
    abstract parent: BaseContainer;
    abstract render(): object;
}