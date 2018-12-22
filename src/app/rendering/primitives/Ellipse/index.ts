import { BasicComponent } from '../../mixins';
import { RzElementProps, MetaProps } from '../../models';

export type EllipseProps = RzElementProps & {

}
export class PrimitiveEllipse extends BasicComponent<EllipseProps> {

    constructor(props: EllipseProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps: EllipseProps) {
        return nextProps.styles !== this.props.styles;
    }
}