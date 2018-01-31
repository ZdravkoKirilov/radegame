import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../../../dynamic-forms/models/Base.model';
import { BoardField } from '../../../../game-mechanics/models/index';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { ConnectedEntities } from '../../../../dynamic-forms/models/ConnectedEntities';

@Component({
    selector: 'rg-field-editor',
    templateUrl: './field-editor.component.html',
    styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent implements OnInit {
    @Output() save: EventEmitter<BoardField> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    @Input() formDefinition: FormDefinition;
    @Input() selectedItem: BoardField;
    @Input() connectedEntities: ConnectedEntities;

    public form: FormGroup;
    public controls: BaseControl[];

    constructor(private cs: ControlsService) {
    }

    saveItem() {
        this.save.emit(this.form.value);
    }

    cancelAction() {
        this.cancel.emit();
    }

    ngOnInit() {
        this.controls = this.formDefinition(this.selectedItem, this.connectedEntities);
        this.form = this.cs.toFormGroup(this.controls);
    }
}
