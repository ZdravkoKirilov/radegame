import { RzElementProps, MetaProps } from "../../models";
import { BasicComponent } from "../../mixins";

export class PrimitiveCollection extends BasicComponent {

    constructor(props: RzElementProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps: RzElementProps) {
        return nextProps.styles !== this.props.styles || nextProps.children !== this.props.children;
    }
}