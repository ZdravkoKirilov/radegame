import { BasicComponent } from '../../bases';
import { RzElementPrimitiveProps, MetaProps, RzStyles } from '../../models';

export type RectangleProps = RzElementPrimitiveProps & {
    styles: Required<Pick<RzStyles, 'stroke_thickness' | 'stroke_color' | 'x' | 'y'>>;
};
export class PrimitiveRectangle extends BasicComponent<RectangleProps> {

    constructor(props: RectangleProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldRerender(nextProps: RectangleProps) {
        return nextProps.styles !== this.props.styles;
    }
}