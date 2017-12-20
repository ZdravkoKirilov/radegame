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

    @Input() formDefinition: FormDefinition;
    @Input() data: Resource;

    public rForm: FormGroup;
    public controls: BaseControl[];

    constructor(private cs: ControlsService) {
    }

    saveResource() {
        this.save.emit(this.rForm.value);
    }

    cancelAction() {
        this.cancel.emit();
    }

    ngOnInit() {
        this.controls = this.formDefinition(this.data);
        this.rForm = this.cs.toFormGroup(this.controls);
    }
}
