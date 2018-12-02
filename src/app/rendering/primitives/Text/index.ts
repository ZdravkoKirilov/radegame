import { RzElementProps, MetaProps } from "../../models";
import { BasicComponent } from "../../mixins";

export class PrimitiveText extends BasicComponent<RzElementProps> {

    static defaultTextStyle = {
        fontFamily: 'Arial', fontSize: 24, stroke: '#ffffff', fill: ['#ffffff'], align: 'center', strokeThickness: 1,
    };

    style: any;

    constructor(props: RzElementProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }
}