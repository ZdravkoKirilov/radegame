import { BasicComponent } from '../../bases';
import { RzElementProps, MetaProps } from '../../models';

export type CircleProps = RzElementProps & {

}
export class PrimitiveCircle extends BasicComponent<CircleProps> {

    constructor(props: CircleProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps: CircleProps) {
        return nextProps.styles !== this.props.styles;
    }
}