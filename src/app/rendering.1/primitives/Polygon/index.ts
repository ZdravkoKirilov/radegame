import { BasicComponent } from '../../mixins';
import { BaseProps } from '../../models';

export class PrimitivePolygon extends BasicComponent {

    constructor(props: BaseProps, graphic: any) {
        super(props, graphic);
    }

    // update(nextProps: BaseProps) {
    //     // const { stroke, strokeWidth, alpha } = this.props.mapped;
    //     // const { points } = this.props;
    //     // const polygon = [];

    //     // points.forEach(elem => {
    //     //     polygon.push(new Point(elem[0], elem[1]));
    //     // });

    //     // this.graphic.clear();

    //     // this.graphic.lineStyle(strokeWidth, stroke, alpha);
    //     // this.graphic.drawPolygon(polygon);
    // }
}