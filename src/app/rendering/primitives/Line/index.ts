import { BasicComponent } from '../../mixins';
import { RzElementProps, MetaProps } from '../../models';

export class PrimitiveLine extends BasicComponent {

    constructor(props: RzElementProps, graphic: any, meta: MetaProps) {
        super(props, graphic, meta);
    }

    shouldUpdate(nextProps: RzElementProps) {
        return nextProps.styles !== this.props.styles && nextProps.points !== this.props.points;
    }

    // update(nextProps: RzElementProps) {
    //     const points = [...nextProps.points];
    //     const { alpha, stroke, strokeWidth } = this.props.mapped;
    //     const start = points.shift();

    //     this.graphic.clear();
    //     this.graphic.lineStyle(strokeWidth, stroke, alpha);

    //     this.graphic.moveTo(start[0], start[1]);

    //     points.forEach(elem => {
    //         this.graphic.lineTo(elem[0], elem[1]);
    //         this.graphic.moveTo(elem[0], elem[1]);
    //     });
    // }
}