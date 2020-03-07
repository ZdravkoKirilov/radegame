import { RzElementPrimitiveProps, MetaProps } from '../../models';
import { BasicComponent } from '../../bases';

export type SpriteProps = RzElementPrimitiveProps & {
    image: string;
}
export class PrimitiveSprite extends BasicComponent<SpriteProps> {

    constructor(props: SpriteProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }
}

