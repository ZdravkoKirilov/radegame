import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Shape, Style } from '@app/game-mechanics';
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

  @OnChange<Shape>(function (value) {
    const mount: MountRef = this.mount;
    const component = mount ? mount.component as StatefulComponent : null;
    const inlineStyle: Style = JSON.parse(value ? value.style_inline as any : '{}');
    if (component) {
      component.updateProps({ shape: value, style: inlineStyle });
    }
  })
  @Input() data: Shape;

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
