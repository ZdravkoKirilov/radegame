import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Resource } from '../../../../game-mechanics/models/index';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { BaseControl } from '../../../../dynamic-forms/models/Base.model';

@Component({
    selector: 'rg-resource-editor',
    templateUrl: './resource-editor.component.html',
    styleUrls: ['./resource-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceEditorComponent implements OnInit {

    @Output() save: EventEmitter<Resource> = new EventEmitter<Resource>();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    @Input() selectedItem: Resource;
    @Input() formDefinition: FormDefinition;

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
        this.controls = this.formDefinition(this.selectedItem);
        this.form = this.cs.toFormGroup(this.controls);
    }
}
