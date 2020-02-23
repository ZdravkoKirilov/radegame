import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Style, RuntimeShape } from '@app/game-mechanics';
import { MountRef, StatefulComponent } from '@app/render-kit';
import { mountPixi } from '@app/engines/pixi';
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

  @OnChange<RuntimeShape>(function (shape) {
    const mount: MountRef = this.mount;
    const component = mount ? mount.component as StatefulComponent : null;
    const shapeStyle = (typeof shape.style === 'function' ? shape.style(shape) : shape.style_inline) || {} as Style;
    if (component) {
      component.updateProps({ shape, style: shapeStyle });
    }
  })
  @Input() data: RuntimeShape;

  mount: MountRef;

  constructor() { }

  ngOnInit() {
    this.mountStage();
  }

  async mountStage() {
    const domHost = this.canvasWrapper.nativeElement;
    this.mount = await mountPixi(RootComponent, domHost, {
      width: 500,
      height: 500,
      props: {
        data: this.data
      },
    });
  }

}
