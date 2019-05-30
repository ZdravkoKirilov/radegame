import { BasicComponent } from '../../bases';
import { RzElementProps, MetaProps } from '../../models';

export type EllipseProps = RzElementProps & {

}
export class PrimitiveEllipse extends BasicComponent<EllipseProps> {

    constructor(props: EllipseProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldRerender(nextProps: EllipseProps) {
        return nextProps.styles !== this.props.styles;
    }
}