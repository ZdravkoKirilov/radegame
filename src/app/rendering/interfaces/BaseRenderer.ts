import { BaseGraphic } from './BaseGraphic';

export abstract class BaseRenderer {
    abstract render(item: BaseGraphic): void;
}