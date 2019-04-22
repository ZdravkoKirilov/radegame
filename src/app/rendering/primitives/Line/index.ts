import { BasicComponent } from '../../mixins';
import { RzElementProps, MetaProps, Points } from '../../models';

export type LineProps = RzElementProps & {
    points: Points;
    dashGap?: number;
}
export class PrimitiveLine extends BasicComponent<LineProps> {

    constructor(props: LineProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps) {
        return nextProps.styles !== this.props.styles || nextProps.points !== this.props.points;
    }
}