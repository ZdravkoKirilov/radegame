import { RzElementProps, MetaProps, BasicComponent } from "../../internal";

export class PrimitiveFragment extends BasicComponent {

    constructor(props: RzElementProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldRerender(nextProps: RzElementProps) {
        return nextProps.children !== this.props.children;
    }

}