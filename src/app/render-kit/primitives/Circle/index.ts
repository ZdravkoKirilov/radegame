import { BasicComponent } from '../../bases';
import { RzElementPrimitiveProps, MetaProps, RzStyles } from '../../models';

export type CircleProps = RzElementPrimitiveProps & {
    styles: Required<Pick<RzStyles, 'stroke_thickness' | 'stroke_color' | 'x' | 'y' | 'width'>>;
};
export class PrimitiveCircle extends BasicComponent<CircleProps> {

    constructor(props: CircleProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldRerender(nextProps: CircleProps) {
        return nextProps.styles !== this.props.styles;
    }
}