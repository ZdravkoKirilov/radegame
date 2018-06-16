import { Graphics, Point, Polygon } from 'pixi.js';

import { BasicComponent } from '../../mixins';
import { Component } from '../../interfaces';
import { BaseProps } from './../../models';

export class PixiPolygon extends BasicComponent {
    graphic: Graphics;

    constructor(props: BaseProps, parent: Component) {
        super(props, new Graphics(), parent);
    }

    update(nextProps: BaseProps) {
        const { stroke, strokeWidth, alpha } = this.props.mapped;
        const { points } = this.props;
        const polygon = [];

        points.forEach(elem => {
            polygon.push(new Point(elem[0], elem[1]));
        });

        this.graphic.clear();

        this.graphic.lineStyle(strokeWidth, stroke, alpha);
        this.graphic.drawPolygon(polygon);
    }
}