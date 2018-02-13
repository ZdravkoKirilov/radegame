import { Component } from '@angular/core';

import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { Stage } from '../../../../game-mechanics/models/index';
import { EditorBase } from '../../../mixins/editor.base';

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
