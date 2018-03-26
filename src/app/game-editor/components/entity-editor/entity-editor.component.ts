import { Component, ChangeDetectionStrategy } from '@angular/core';

import { GameEntity } from '../../../game-mechanics';
import { ControlsService } from '../../../dynamic-forms';
import { EditorBase } from '../../mixins';

@Component({
  selector: 'rg-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityEditorComponent extends EditorBase<GameEntity> {

  constructor(public cs: ControlsService) {
    super(cs);
  }
}
