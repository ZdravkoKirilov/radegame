import { RzElementProps } from "../../models";
import { BasicComponent } from "../../mixins";

export class PrimitiveText extends BasicComponent {

    static defaultTextStyle = {
        fontFamily: 'Arial', fontSize: 24, stroke: '#ffffff', fill: ['#ffffff'], align: 'center', strokeThickness: 1,
    };

    style: any;

    constructor(props: RzElementProps, graphic: any) {
        
        super(props, graphic);
    }
}