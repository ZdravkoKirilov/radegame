import { Component, Input } from '@angular/core';

import { Sandbox } from '@app/game-mechanics';
import { MountRef, updateWithNewProps } from '@app/render-kit';
import { OnChange } from '@app/shared';

@Component({
  selector: 'rg-test-board-presentation',
  templateUrl: './test-board-presentation.component.html',
  styleUrls: ['./test-board-presentation.component.scss']
})
export class TestBoardPresentationComponent {

  @Input() sandbox: Sandbox;

  @OnChange<number>(function (updateId, meta) {
    const self: TestBoardPresentationComponent = this;
    if (self.mountRef && !meta.firstChange) {
      updateWithNewProps(self.mountRef.component, {});
    }
  })
  @Input() updateId: number;


  @Input() rerunId: number;


  mountRef: MountRef;

}
