import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDefinition, BaseControl, ControlsService, ConnectedEntities } from '../../dynamic-forms';

export abstract class EditorBase<T> implements OnInit {

    @Output() save: EventEmitter<T> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    @Input() formDefinition: FormDefinition;
    @Input() selectedItem: T;
    @Input() connectedEntities: ConnectedEntities;

    public form: FormGroup;
    public controls: BaseControl[];

    constructor(public cs: ControlsService) {
    }

    ngOnInit() {
        if (this.formDefinition) {
            this.controls = this.formDefinition(this.selectedItem, this.connectedEntities);
            this.form = this.cs.toFormGroup(this.controls);
        }
    }

    saveItem() {
        this.save.emit(<T>this.form.value);
    }

    cancelAction() {
        this.cancel.emit();
    }

}