import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

import { combineStyles, Shape, ExpressionContext } from '@app/game-mechanics';
import { MountRef, StatefulComponent } from '@app/render-kit';
import { OnChange } from '@app/shared';

import RootComponent from '../graphics/root';

@Component({
  selector: 'rg-shape-preview',
  template: `
    <div class="canvas-wrapper" #canvasWrapper tabindex="0"></div>
  `,
  styles: []
})
export class ShapePreviewComponent implements OnInit {

  @ViewChild('canvasWrapper', { static: true }) canvasWrapper: ElementRef<HTMLDivElement>;

  @OnChange<Shape>(function (shape) {
    const mount: MountRef = this.mount;
    const context: ExpressionContext = this.context;
    const component = mount ? mount.component as StatefulComponent : null;
    if (component && shape && context) {
      const runtimeShape = Shape.toRuntime(context, shape);
      const shapeStyle = combineStyles(runtimeShape);
      component.updateProps({ shape: runtimeShape, style: shapeStyle });
    }
  })
  @Input() data: Shape;

  @Input() context: ExpressionContext;

  mount: MountRef;

  constructor() { }

  ngOnInit() {
    this.mountWidget();
  }

  async mountWidget() {
    const domHost = this.canvasWrapper.nativeElement;
    const pixiEngine = await import('@app/engines/pixi');
    this.mount = await pixiEngine.mountPixi(RootComponent, domHost, {
      width: 500,
      height: 500,
      props: {
        data: this.data
      },
    });
  }

}
