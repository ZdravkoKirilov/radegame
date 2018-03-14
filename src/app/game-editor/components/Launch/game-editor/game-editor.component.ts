import { Component } from '@angular/core';

import { Game } from '../../../../game-mechanics';
import { ControlsService } from '../../../../dynamic-forms';
import { EditorBase } from '../../../mixins';

@Component({
  selector: 'rg-game-editor',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.scss']
})
export class GameEditorComponent extends EditorBase<Game> {

  constructor(public cs: ControlsService) {
    super(cs)
  }

}
