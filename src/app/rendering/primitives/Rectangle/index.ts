import { BasicComponent } from '../../mixins';
import { RzElementProps, MetaProps, Points } from '../../models';

type Props = RzElementProps & {
    points: Points
}
export class PrimitiveRectangle extends BasicComponent<Props> {

    constructor(props: Props, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps: Props) {
        return nextProps.styles !== this.props.styles || nextProps.points !== this.props.points;
    }
}