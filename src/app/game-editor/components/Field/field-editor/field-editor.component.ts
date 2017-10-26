import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseControl} from '../../../../dynamic-forms/models/Base';
import {BoardField} from '../../../../game-mechanics/models/index';
import {ControlsService} from '../../../../dynamic-forms/services/controls.service';

@Component({
    selector: 'rg-field-editor',
    templateUrl: './field-editor.component.html',
    styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent implements OnInit {
    @Input() controls: BaseControl<any>[] = [];
    @Output() save: EventEmitter<BoardField> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    public form: FormGroup;

    constructor(private cs: ControlsService) {
    }

    handleSave() {
        this.save.emit(this.form.value);
    }

    handleCancel() {
        this.cancel.emit();
    }

    ngOnInit() {
        this.form = this.cs.toFormGroup(this.controls);
    }
}
