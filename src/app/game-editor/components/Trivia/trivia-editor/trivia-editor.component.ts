import { Component } from '@angular/core';
import { ControlsService } from '../../../../dynamic-forms';
import { Trivia } from '../../../../game-mechanics';
import { EditorBase } from '../../../mixins';

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
