import { Component } from '@angular/core';

import { ControlsService } from '../../../../dynamic-forms';
import { Stage } from '../../../../game-mechanics';
import { EditorBase } from '../../../mixins';

@Component({
  selector: 'rg-stage-editor',
  templateUrl: './stage-editor.component.html',
  styleUrls: ['./stage-editor.component.scss']
})
export class StageEditorComponent extends EditorBase<Stage> {
  constructor(public cs: ControlsService) {
    super(cs);
  }

}
