import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { MountRef, updateWithNewProps, findInDescendants, StatefulComponent } from '@app/render-kit';
import { OnChange, WindowRefService, Dictionary } from '@app/shared';
import { AppState } from '@app/core';
import { Widget, Module, RuntimeSandbox, RuntimeWidgetNode, GraphicWidgetNode, } from '@app/game-mechanics';
import { mountPixi } from '@app/engines/pixi';

import { EditorSandboxRoot, EditorSandboxRootProps } from '../../../graphics';
import { selectCommonGameStore } from "../../../state";

type UpdatableProps = Partial<{
  fromParent: {},
  data: Partial<RuntimeWidgetNode>,
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
  @Input() node: RuntimeWidgetNode;

  @Input() assets: Dictionary;

  @Input() sandbox: RuntimeSandbox;

  @OnChange<number>(function (_, meta) {
    const self: TestBoardPresentationComponent = this;
    const { mountRef, sandbox } = self;
    if (mountRef && !meta.firstChange && sandbox) {
      let newProps = { fromParent: sandbox?.from_parent() || {} };
      updateWithNewProps<UpdatableProps>(mountRef.component, newProps);
      self.updateEmulatedNode();
    }
  })
  @Input() updateId: number;

  @OnChange(async function () {
    const self: TestBoardPresentationComponent = this;
    if (self.mountRef) {
      self.mountRef.destroy();
    }
    const domHost = this.canvasWrapper.nativeElement;
    const { widget, module, node } = self;
    const fromParent = self.sandbox?.from_parent();
    self.mountRef = await mountPixi<EditorSandboxRootProps>(EditorSandboxRoot, domHost, {
      width: self.windowRef.nativeWindow.innerWidth,
      height: self.windowRef.nativeWindow.innerHeight,
      props: {
        widget, module, node, fromParent, store: self.store,
        selectCommonGameStore,
      },
      assets: new Set(Object.values(self.assets || {})),
    });
    self.updateEmulatedNode();
    window['pixiroot'] = self.mountRef.component;
  })
  @Input() rerunId: number;

  updateEmulatedNode() {
    const { widget, sandbox, mountRef } = this;
    if (widget && sandbox && mountRef) {
      const emulated_node = sandbox.emulated_node();
      if (emulated_node) {
        const widgetNode = findInDescendants<StatefulComponent>(mountRef.component)(GraphicWidgetNode);
        if (widgetNode) {
          widgetNode.updateProps({
            data: emulated_node
          });
        }
      }
    }
  }

}
