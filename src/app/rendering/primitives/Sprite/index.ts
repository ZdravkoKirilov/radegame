import { RzElementProps, MetaProps } from '../../models';
import { BasicComponent } from '../../mixins';

export class PrimitiveSprite extends BasicComponent {

    constructor(props: RzElementProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }
}

