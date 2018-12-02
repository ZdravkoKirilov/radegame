import { BasicComponent } from '../../mixins';
import { RzElementProps, MetaProps, Points } from '../../models';

type Props = RzElementProps & {
    points: Points;
}
export class PrimitiveLine extends BasicComponent<Props> {

    constructor(props: Props, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps) {
        return nextProps.styles !== this.props.styles || nextProps.points !== this.props.points;
    }
}