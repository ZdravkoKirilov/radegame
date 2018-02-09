import { Component } from '@angular/core';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { Trivia } from '../../../../game-mechanics/models/index';
import { EditorBase } from '../../../mixins/editor.base';

@Component({
    selector: 'rg-trivia-editor',
    templateUrl: './trivia-editor.component.html',
    styleUrls: ['./trivia-editor.component.scss']
})
export class TriviaEditorComponent extends EditorBase<Trivia> {

    constructor(public cs: ControlsService) {
        super(cs);
    }
}
