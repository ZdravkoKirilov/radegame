import { Component } from '@angular/core';

import { Field } from '../../../../game-mechanics/models';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { EditorBase } from '../../../mixins/editor.base';

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
