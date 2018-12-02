import { RzElementProps, MetaProps } from '../../models';
import { BasicComponent } from '../../mixins';

type Props = RzElementProps & {
    image: string;
}
export class PrimitiveSprite extends BasicComponent<Props> {

    constructor(props: Props, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }
}

