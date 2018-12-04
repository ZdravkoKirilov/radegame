import { RzElementProps, MetaProps } from '../../models';
import { BasicComponent } from '../../mixins';

export type SpriteProps = RzElementProps & {
    image: string;
}
export class PrimitiveSprite extends BasicComponent<SpriteProps> {

    constructor(props: SpriteProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }
}

