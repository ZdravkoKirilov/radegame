import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDefinition } from '../../dynamic-forms/models/FormDefinition.model';
import { BaseControl } from '../../dynamic-forms/models/Base.model';
import { ControlsService } from '../../dynamic-forms/services/controls.service';
import { ConnectedEntities } from '../../dynamic-forms/models/ConnectedEntities';

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
        this.controls = this.formDefinition(this.selectedItem, this.connectedEntities);
        this.form = this.cs.toFormGroup(this.controls);
    }

    saveItem() {
        this.save.emit(<T>this.form.value);
    }

    cancelAction() {
        this.cancel.emit();
    }

}