import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDefinition } from '../../../../shared/models/FormDefinition';
import { BaseControl } from '../../../../dynamic-forms/models/Base';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';

@Component({
    selector: 'rg-activity-editor',
    templateUrl: './activity-editor.component.html',
    styleUrls: ['./activity-editor.component.scss']
})
export class GameActionEditorComponent implements OnInit {

    @Input() formDefinition: FormDefinition;

    public form: FormGroup;
    public controls: BaseControl[];

    constructor(private cs: ControlsService) {
    }

    ngOnInit() {
        this.controls = this.formDefinition();
        this.form = this.cs.toFormGroup(this.controls);
    }

}
