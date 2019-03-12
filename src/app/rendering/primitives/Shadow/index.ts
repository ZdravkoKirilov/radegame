import { BasicComponent } from '../../mixins';
import { RzElementProps, MetaProps } from '../../models';

export type ShadowProps = RzElementProps & {
    color: number;
    alpha: number;
    blur: number;
    distance: number;
}
export class PrimitiveShadow extends BasicComponent<ShadowProps> {

    constructor(props: ShadowProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps: ShadowProps) {
        return nextProps !== this.props;
    }
}