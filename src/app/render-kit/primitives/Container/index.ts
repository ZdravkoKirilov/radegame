import { RzElementProps, MetaProps } from "../../models";
import { BasicComponent } from "../../bases";

export class PrimitiveContainer extends BasicComponent<RzElementProps> {

    constructor(props: RzElementProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldRerender(nextProps: RzElementProps) {
        return nextProps.styles !== this.props.styles || nextProps.children !== this.props.children;
    }

}