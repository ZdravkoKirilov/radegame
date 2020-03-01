import { RzElementProps, MetaProps, RzTextStyles } from "../../models";
import { BasicComponent } from "../../bases";

export type PrimitiveTextProps = RzElementProps & {
    value: string;
    textStyle: RzTextStyles;
};
export class PrimitiveText extends BasicComponent<PrimitiveTextProps> {

    static defaultTextStyle = {
        fontFamily: 'Arial', fontSize: 24, stroke: '#ffffff', fill: ['#ffffff'], align: 'center', strokeThickness: 1,
    };

    style: any;

    constructor(props: PrimitiveTextProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }
}