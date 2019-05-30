import { RzElementProps, MetaProps } from "../../models";
import { BasicComponent } from "../../bases";

export class PrimitiveCollection extends BasicComponent<RzElementProps> {

    constructor(props: RzElementProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps: RzElementProps) {
        return nextProps.styles !== this.props.styles || nextProps.children !== this.props.children;
    }
}