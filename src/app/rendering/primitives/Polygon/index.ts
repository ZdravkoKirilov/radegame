import { BasicComponent } from '../../mixins';
import { RzElementProps, MetaProps } from '../../models';

export class PrimitivePolygon extends BasicComponent {

    constructor(props: RzElementProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps: RzElementProps) {
        return nextProps.styles !== this.props.styles || nextProps.points !== this.props.points;
    }
}