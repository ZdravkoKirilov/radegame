import { BasicComponent } from "./BasicComponent";
import { RzElementProps, RzElement, RenderFunction, MetaProps } from "../models";

export class FunctionalComponent<P extends Partial<RzElementProps>> extends BasicComponent<P> {
    template: RenderFunction<P>;

    constructor(props: P, template: RenderFunction<P>, meta: MetaProps) {
        super(props, null, meta);
        this.template = template;
    }
    render(): RzElement {
        if (!this.template) {
            throw new Error('Functional component must have a template.');
        }
        return this.template(this.props as P);
    }
}