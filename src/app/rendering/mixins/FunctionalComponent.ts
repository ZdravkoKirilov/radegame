import { BasicComponent } from "./BasicComponent";
import { RzElementProps, RzElement, RenderFunction } from "../models";

export class FunctionalComponent<P extends RzElementProps> extends BasicComponent {
    template: RenderFunction<P>;

    constructor(props: P, template: RenderFunction<P>) {
        super(props, null);
        this.template = template;
    }
    render(): RzElement {
        if (!this.template) {
            throw new Error('Functional component must have a template.');
        }
        return this.template(this.props as P);
    }
}