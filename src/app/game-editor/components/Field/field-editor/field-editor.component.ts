import { Component } from '@angular/core';

import { BoardField } from '../../../../game-mechanics/models/index';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { EditorBase } from '../../mixins/editor.base';

@Component({
    selector: 'rg-field-editor',
    templateUrl: './field-editor.component.html',
    styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent extends EditorBase<BoardField> {

    constructor(public cs: ControlsService) {
        super(cs);
    }
}
