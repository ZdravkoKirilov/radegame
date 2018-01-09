import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { BaseControl } from '../../../../dynamic-forms/models/Base.model';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { Activity } from '../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-activity-editor',
    templateUrl: './activity-editor.component.html',
    styleUrls: ['./activity-editor.component.scss']
})
export class GameActionEditorComponent implements OnInit {

    @Output() save: EventEmitter<Activity> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    @Input() formDefinition: FormDefinition;
    @Input() selectedItem: Activity;

    public form: FormGroup;
    public controls: BaseControl[];

    constructor(private cs: ControlsService) {
    }

    ngOnInit() {
        this.controls = this.formDefinition(this.selectedItem);
        this.form = this.cs.toFormGroup(this.controls);
    }

    saveItem() {
        this.save.emit(this.form.value);
    }

    cancelAction() {
        this.cancel.emit();
    }

}
