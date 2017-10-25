import {Component, Input, Output, EventEmitter} from '@angular/core';

import {BaseControl} from '../../../../dynamic-forms/models/Base';
import {BoardField} from '../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-field-editor',
    templateUrl: './field-editor.component.html',
    styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent {
    @Input() controls: BaseControl<any>[] = [];
    @Output() save: EventEmitter<BoardField> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    private data: BoardField;

    constructor() {
    }

    handleFieldChange(data: BoardField) {
        this.data = data;
    }

    handleSave() {
        this.save.emit(this.data);
    }

    handleCancel() {
        this.cancel.emit();
    }
}
