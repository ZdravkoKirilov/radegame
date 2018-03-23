import { Component } from '@angular/core';

import { Field } from '../../../../game-mechanics';
import { ControlsService } from '../../../../dynamic-forms';
import { EditorBase } from '../../../mixins';

@Component({
    selector: 'rg-field-editor',
    templateUrl: './field-editor.component.html',
    styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent extends EditorBase<Field> {

    constructor(public cs: ControlsService) {
        super(cs);
    }
}
