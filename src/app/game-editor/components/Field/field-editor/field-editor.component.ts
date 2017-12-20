import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../../../dynamic-forms/models/Base.model';
import { BoardField, Resource } from '../../../../game-mechanics/models/index';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';

@Component({
    selector: 'rg-field-editor',
    templateUrl: './field-editor.component.html',
    styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent implements OnInit {
    @Input() formDefinition: FormDefinition;
    @Input() resources: Resource[] = [];
    @Input() data: BoardField = {};
    @Output() save: EventEmitter<BoardField> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    public form: FormGroup;
    public formControls: BaseControl[];

    constructor(private cs: ControlsService) {
    }

    handleSave() {
        this.save.emit(this.form.value);
    }

    handleCancel() {
        this.cancel.emit();
    }

    ngOnInit() {
        this.formControls = this.formDefinition(this.resources, this.data);
        this.form = this.cs.toFormGroup(this.formControls);
    }
}
