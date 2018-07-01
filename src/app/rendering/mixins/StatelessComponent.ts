import { BasicComponent } from "./BasicComponent";
import { BaseProps } from "../models";

export class StatelessComponent<P extends BaseProps> extends BasicComponent {
    stateless = true;
    basic = false;
    template: string;

    constructor(props: P, graphic: any, template: string) {
        super(props, graphic);
        this.template = template;
    }
    render(): string {
        if (!this.template) {
            throw new Error('Stateless component must have a template.');
        }
        return this.template;
    }
}