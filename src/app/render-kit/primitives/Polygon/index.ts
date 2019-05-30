import { BasicComponent } from '../../bases';
import { RzElementProps, MetaProps, Points } from '../../models';

type Props = RzElementProps & {
    points: Points;
}
export class PrimitivePolygon extends BasicComponent<Props> {

    constructor(props: Props, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldRerender(nextProps: Props) {
        return nextProps.styles !== this.props.styles || nextProps.points !== this.props.points;
    }
}