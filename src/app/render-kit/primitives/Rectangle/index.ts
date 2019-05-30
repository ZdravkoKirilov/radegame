import { BasicComponent } from '../../bases';
import { RzElementProps, MetaProps } from '../../models';

export type RecProps = RzElementProps & {
    
}
export class PrimitiveRectangle extends BasicComponent<RecProps> {

    constructor(props: RecProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldRerender(nextProps: RecProps) {
        return nextProps.styles !== this.props.styles;
    }
}