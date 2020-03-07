import { BasicComponent } from '../../bases';
import { RzElementPrimitiveProps, MetaProps, RzStyles } from '../../models';

export type EllipseProps = RzElementPrimitiveProps & {
    styles: Required<Pick<RzStyles, 'stroke_thickness' | 'stroke_color' | 'x' | 'y' | 'width' | 'height'>>;
};
export class PrimitiveEllipse extends BasicComponent<EllipseProps> {

    constructor(props: EllipseProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldRerender(nextProps: EllipseProps) {
        return nextProps.styles !== this.props.styles;
    }
}