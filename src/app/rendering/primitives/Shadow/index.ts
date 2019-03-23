import { BasicComponent } from '../../mixins';
import { RzElementProps, MetaProps } from '../../models';

export type ShadowProps = RzElementProps & {}
export class PrimitiveShadow extends BasicComponent<ShadowProps> {

    constructor(props: ShadowProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps: ShadowProps) {
        return nextProps !== this.props;
    }

    render() {
        if (typeof this.props.children === typeof Function) {
            return (this.props.children as Function)(this.graphic);
        }
    }

}