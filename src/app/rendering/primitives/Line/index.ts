import { Graphics } from 'pixi.js';

import { BasicComponent } from '../../mixins';
import { Component } from '../../interfaces';
import { BaseProps } from './../../models';

export class PixiLine extends BasicComponent {
    graphic: Graphics;

    constructor(props: BaseProps, parent: Component) {
        super(props, new Graphics(), parent);
    }

    update(nextProps: BaseProps) {
        const points = [...nextProps.points];
        const { alpha, stroke, strokeWidth } = this.props.mapped;
        const start = points.shift();

        this.graphic.clear();
        this.graphic.lineStyle(strokeWidth, stroke, alpha);

        this.graphic.moveTo(start[0], start[1]);

        points.forEach(elem => {
            this.graphic.lineTo(elem[0], elem[1]);
            this.graphic.moveTo(elem[0], elem[1]);
        });
    }
}