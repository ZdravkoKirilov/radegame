import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import isFunction from 'lodash/isFunction';

import { MountRef, updateWithNewProps } from '@app/render-kit';
import { OnChange, WindowRefService, Dictionary } from '@app/shared';
import { AppState } from '@app/core';
import { Widget, Module, RuntimeSandbox, WidgetNode, registerComponents } from '@app/game-mechanics';

import { EditorSandboxRoot, EditorSandboxRootProps } from '../../../graphics';
import { selectCommonGameStoreWithOverrides } from "../../../state";

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

      const newProps = {
        fromParent: isFunction(sandbox?.from_parent) ? sandbox.from_parent() || {} : {},
        selectCommonGameStore: selectCommonGameStoreWithOverrides({
          state: isFunction(self.sandbox?.global_state) ? self.sandbox?.global_state() || {} : {},
          private_data: isFunction(self.sandbox?.own_data) ? self.sandbox?.own_data() || {} : {},
          other: {},
        }),
      };
      updateWithNewProps<UpdatableProps>(mountRef.component, newProps);

    }
  })
  @Input() updateId: number;

  @OnChange(async function () {
    const self: TestBoardPresentationComponent = this;
    const domHost = this.canvasWrapper.nativeElement;
    const { sandbox } = this;

    if (self.mountRef) {
      self.mountRef.destroy();
    }

    const pixiEngine = await import('@app/engines/pixi');
    self.mountRef = await pixiEngine.mountPixi<EditorSandboxRootProps>(EditorSandboxRoot, domHost, {
      width: self.windowRef.nativeWindow.innerWidth,
      height: self.windowRef.nativeWindow.innerHeight,
      props: {
        widget: self.widget,
        module: self.module,
        node: self.node,
        fromParent: isFunction(sandbox?.from_parent) ? sandbox.from_parent() || {} : {},
        store: self.store,
        selectCommonGameStore: selectCommonGameStoreWithOverrides({
          state: isFunction(self.sandbox?.global_state) ? self.sandbox?.global_state() || {} : {},
          private_data: isFunction(self.sandbox?.own_data) ? self.sandbox?.own_data() || {} : {},
          other: {},
        }),
      },
      assets: new Set(Object.values(self.assets || {})),
      registerComponents,
    });
    window['pixiroot'] = self.mountRef.component;
  })
  @Input() rerunId: number;

}
