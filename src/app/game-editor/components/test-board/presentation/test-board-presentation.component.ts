import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import isFunction from 'lodash/isFunction';

import { MountRef, updateWithNewProps } from '@app/render-kit';
import { OnChange, WindowRefService, Dictionary } from '@app/shared';
import { AppState } from '@app/core';
import { Widget, Module, RuntimeSandbox, WidgetNode, } from '@app/game-mechanics';
import { mountPixi } from '@app/engines/pixi';

import { EditorSandboxRoot, EditorSandboxRootProps } from '../../../graphics';
import { selectCommonGameStore } from "../../../state";

type UpdatableProps = Partial<{
  fromParent: {},
}>
@Component({
  selector: 'rg-test-board-presentation',
  templateUrl: './test-board-presentation.component.html',
  styleUrls: ['./test-board-presentation.component.scss']
})
export class TestBoardPresentationComponent {
  constructor(private windowRef: WindowRefService, private store: Store<AppState>) { }
  mountRef: MountRef;

  @ViewChild('canvasWrapper', { static: true }) canvasWrapper: ElementRef<HTMLDivElement>;

  @Input() widget: Widget;
  @Input() module: Module;
  @Input() node: WidgetNode;

  @Input() assets: Dictionary;

  @Input() sandbox: RuntimeSandbox;

  @OnChange<number>(function (_, meta) {
    const self: TestBoardPresentationComponent = this;
    const { mountRef, sandbox } = self;
    if (mountRef && !meta.firstChange && sandbox) {
      if (sandbox.from_parent) {
        let newProps = { fromParent: sandbox?.from_parent() };
        updateWithNewProps<UpdatableProps>(mountRef.component, newProps);
      }
    }
  })
  @Input() updateId: number;

  @OnChange(async function () {
    const self: TestBoardPresentationComponent = this;
    const domHost = this.canvasWrapper.nativeElement;
    const fromParent = isFunction(self.sandbox?.from_parent) ? self.sandbox.from_parent() : null;

    if (self.mountRef) {
      self.mountRef.destroy();
    }
 
    self.mountRef = await mountPixi<EditorSandboxRootProps>(EditorSandboxRoot, domHost, {
      width: self.windowRef.nativeWindow.innerWidth,
      height: self.windowRef.nativeWindow.innerHeight,
      props: {
        widget: self.widget,
        module: self.module,
        node: self.node,
        fromParent,
        store: self.store,
        selectCommonGameStore,
      },
      assets: new Set(Object.values(self.assets || {})),
    });
    window['pixiroot'] = self.mountRef.component;
  })
  @Input() rerunId: number;

}
