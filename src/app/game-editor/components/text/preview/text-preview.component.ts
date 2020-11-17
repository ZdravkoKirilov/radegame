import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { combineStyles, ExpressionContext, Text } from '@app/game-mechanics';
import { MountRef } from '@app/render-kit';
import { OnChange } from '@app/shared';

import RootComponent from '../graphics/root';

@Component({
  selector: 'rg-text-preview',
  template: `
<div>
    <mat-form-field *ngIf="data && data.translations?.length">
      <mat-placeholder>Translation</mat-placeholder>
      <mat-select (selectionChange)="changeTranslation($event.value)" [value]="translationId">
          <mat-option [value]="-1">None</mat-option>
          <mat-option *ngFor="let item of data.translations" [value]="item.id">
              {{item.value}}
          </mat-option>
      </mat-select>
    </mat-form-field>

  <div class="canvas-wrapper" #canvasWrapper tabindex="0"></div>
</div>
  `,
  styles: [
  ]
})
export class TextPreviewComponent {

  @ViewChild('canvasWrapper', { static: true }) canvasWrapper: ElementRef<HTMLDivElement>;

  @OnChange<TextPreviewComponent, Text>(function (ctx, text) {
    const mount: MountRef = ctx.mount;
    const context: ExpressionContext = ctx.context;
    const component = mount ? mount.component as RootComponent : null;
    if (component && text && context) {
      const runtimeText = Text.toRuntime(context, text);
      const textStyle = combineStyles(runtimeText);
      component.updateProps({ text: runtimeText, style: textStyle, translation: ctx.translationId });
    }
  })
  @Input() data: Text;

  @OnChange<TextPreviewComponent, number>(function (ctx, translationId) {
    const mount: MountRef = ctx.mount;
    const component = mount ? mount.component as RootComponent : null;
    if (component) {
      component.updateProps({ translation: translationId });
    }
  })
  translationId: number = -1;

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
        text: this.data
      },
    });
  }

  changeTranslation(translationId: number) {
    this.translationId = translationId;
  }

}
